import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { AppStyles, DryStyles } from "../styles/global.styles";
import NavButton from '../../assets/icons/nav-vector.svg';
import Gradient from "./Gradient";
import { InputBox } from "./InputBox";
import { NavbarStyles } from "../styles/navbar.styles";
import { determineColor } from "../util/colorbrightness";
import { useContext, useEffect, useRef, useState } from "react";
import { printMoney } from "../util/money";
import { CoinbankContext } from "..";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenMath } from "../util/screen";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "../util/Storage";

function NavigationBar() {

	const { data, setData } = useContext(CoinbankContext);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rotation_ref = useRef(new Animated.Value(0));

	useEffect(() => {
		const rotation = rotation_ref.current;
		const time = 100;
		if (isOpen) {
			Animated.timing(rotation, {
				duration: time,
				toValue: 1,
				useNativeDriver: true
			}).start()
		} else {
			Animated.timing(rotation, {
				duration: time,
				toValue: 0,
				useNativeDriver: true
			}).start()
		}
	}, [isOpen])

	const rotate = rotation_ref.current.interpolate<string>({
		inputRange: [0, 1],
		outputRange: ['0deg', '90deg']
	});

	return (
		<>
			<NavigationMenu isOpen={isOpen} close={() => {
				setIsOpen(false);
				setData('stop_scrolling', false);
			}} />
			<View style={{ ...DryStyles['flex-row'], paddingBottom: 10, zIndex: 9999999 }}>
				<View style={{ ...DryStyles['screen-padding'], ...DryStyles['flex'], ...DryStyles['flex-row'], ...DryStyles['space-between'], ...DryStyles['align-center'] }}>
					<TouchableOpacity style={{ ...DryStyles['flex-row'], gap: 20, justifyContent: 'flex-end' }} onPress={() => { setIsOpen(!isOpen); setData('stop_scrolling', !isOpen) }}>
						<Animated.View style={{ transform: [{ rotate: rotate }] }}>
							<Gradient.Mask gradienttype='gradient-1' >
								<NavButton />
							</Gradient.Mask>
						</Animated.View>
					</TouchableOpacity>
					<InputBox.Picker
						options={
							[...data.coinbanks?.map((coinbank, idx) => ({
								display: `${coinbank.emoji ? coinbank.emoji + " " : ""}${coinbank.name} - ${printMoney(coinbank.value)}`, id: idx, key: coinbank.coinbank_id
							})) ?? []
							]}
						defaultValue={(data.coinbanks?.[data.current_coinbank ?? 0].coinbank_id) ?? 0}
						onChange={(value) => {
							setData("current_coinbank", (old) => {
								if (!value || value < 0) {
									if (old) return old;
									return 0;
								}
								return value;
							});
						}}
					>
						<CoinJarLabel
							id={`$data.coinbanks?.[data.current_coinbank ?? 0].coinbank_id ?? ""}`}
							color='#23ce6b'
							name={data.coinbanks?.[data.current_coinbank ?? 0].name ?? ""}
							emoji={data.coinbanks?.[data.current_coinbank ?? 0].emoji ?? ""}
						/>
					</InputBox.Picker>
				</View>
			</View >
		</>
	)
}

type NavigationMenuProps = {
	isOpen: boolean;
	close: () => void;
}

function NavigationMenu({ isOpen, close }: NavigationMenuProps) {
	const width = useRef(new Animated.Value(0));
	const navigation = useNavigation();

	useEffect(() => {
		const TIME = 100;
		const _width = width.current;
		if (isOpen) {
			Animated.timing(_width, {
				toValue: ScreenMath.calculateWidth(80),
				duration: TIME,
				useNativeDriver: false
			}).start();
		} else {
			Animated.timing(_width, {
				toValue: 0,
				duration: TIME,
				useNativeDriver: false
			}).start()
		}
	}, [isOpen])

	function navigateTo(route: string) {
		close();
		//@ts-ignore
		navigation.navigate(route);
	}

	function logout() {
		Storage.clear('user_id');
		Storage.clear('active_token');
		Storage.clear('refresh_token');
		//@ts-ignore
		navigation.navigate('Login');
		close();
	}

	return (
		<Animated.View style={{ ...NavbarStyles['navmenu'], width: width.current }}>
			<Gradient.Mask gradienttype='gradient-1' style={{ ...NavbarStyles['navmenu-container'], width: '100%' }}>
				<View style={{ ...NavbarStyles['navmenu-container'], width: '100%' }}>
				</View>
			</Gradient.Mask>
			<View style={NavbarStyles['navbar-internal']}>
				<View style={{ marginTop: '135%', width: '100%', ...DryStyles['flex-column'], gap: 0 }}>
					<NavigationBarItem name='Coinbank'
						onClick={() => navigateTo('Home')}
					/>
					<NavigationBarItem name='Show Coinbank Details' />
					<NavigationBarItem name='Add a Coinbank'
						onClick={() => navigateTo('Add-Coinbank')}
					/>
					<NavigationBarItem name='Create a Coinbank'
						style={{ borderBottomWidth: 2.1 }}
						onClick={() => navigateTo('Create-Coinbank')}
					/>
					<View style={{ marginTop: 120 }}>
						<NavigationBarItem name='Settings' />
						<NavigationBarItem
							name='Logout'
							style={{ borderBottomWidth: 2.1 }}
							onClick={logout}
						/>
					</View>
				</View>
			</View>
		</Animated.View >
	)
}

type NavigationBarItemProps = {
	onClick?: Function
	name: string
	style?: ViewStyle
}

function NavigationBarItem({ style, onClick, name }: NavigationBarItemProps) {
	return (
		<TouchableOpacity style={{ ...NavbarStyles['navbar-item'], ...style }} onPress={() => onClick && onClick()}>
			<Text style={NavbarStyles['navbar-item-text']}>
				{name}
			</Text>
		</TouchableOpacity>
	)
}


type CoinJarLabelProps = {
	id: string;
	name: string;
	emoji?: string;
	color?: string;
}
function CoinJarLabel({ id, name = "", emoji = "", color = "#23CE6B" }: CoinJarLabelProps) {
	return (
		<View style={{ ...NavbarStyles["coinjar-indicator-container"], ...DryStyles['flex-center'], backgroundColor: color }}>
			{emoji === "" &&
				<Text style={{ ...AppStyles['text'], ...NavbarStyles['coinjar-text'], color: determineColor(color) }}>{name.at(0)?.toUpperCase()}</Text>
			}
			{emoji !== "" &&
				<Text style={{ ...NavbarStyles['coinjar-emoji'], color: determineColor(color) }}>{emoji}</Text>
			}
		</View>
	)
}

export default NavigationBar
