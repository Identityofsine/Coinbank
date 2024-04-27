import { Animated, Text, View } from "react-native";
import { AsScreen } from "./Screen";
import { AppStyles, DryStyles } from "../styles/global.styles";
import Gradient from "../components/Gradient";
import Deposit from "../../assets/icons/button01.svg"
import Withdraw from "../../assets/icons/button02.svg"
import Audit from "../../assets/icons/button03.svg"
import { useEffect, useRef, useState } from "react";
import { API } from "../api/request";
import { getCoinbanks } from "../api/getCoinbanks";
import { sleep } from "../util/sleep";

type HomeButtonProps = {
	icon: 'deposit' | 'withdraw' | 'audit'
	text: string
}

function HomeButton({ icon, text }: HomeButtonProps) {
	return (
		<View
			style={{ ...DryStyles['align-center'], gap: 13 }}
		>
			{icon === 'deposit' && <Deposit />}
			{icon === 'withdraw' && <Withdraw />}
			{icon === 'audit' && <Audit />}
			<Text
				style={{ ...AppStyles.text, ...DryStyles['button-1-text'] }}
			>{text}</Text>
		</View>
	)
}

export function HomeScreen() {

	const [isPending, setPending] = useState<boolean>(false);
	const [coinbanks, setCoinbanks] = useState<API.Coinbank[] | undefined>(undefined);

	useEffect(() => {
		setPending(true);
		sleep(2000).then(() => {
			getCoinbanks().then((response) => {
				if (response) {
					setCoinbanks(response.coinbanks);
				}
			})
				.finally(() => setPending(false));
		});
	}, []);

	useEffect(() => {
		if (coinbanks)
			console.log(coinbanks);
	}, [coinbanks]);



	return (
		<AsScreen>
			{/* Flex Container at top */}
			{isPending && <HomeScreenSkeleton />}
			{!isPending && coinbanks && <HomeScreenComponents {...coinbanks?.[0]} />}
		</AsScreen>
	);
}

function HomeScreenSkeleton() {
	const shimmerAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const TIME = 900;
		Animated.loop(
			Animated.sequence([
				Animated.timing(shimmerAnim, {
					toValue: .5,
					duration: TIME,
					useNativeDriver: true
				}),
				Animated.timing(shimmerAnim, {
					toValue: 0,
					duration: TIME,
					useNativeDriver: true
				})
			]))
			.start();

		return () => {
			shimmerAnim.stopAnimation();
		}
	}, []);


	return (
		<>
			<Animated.View style={{ height: 325, minWidth: 100, backgroundColor: '#353535', opacity: shimmerAnim }}>

			</Animated.View>
		</>
	);
}

type HomeScreenComponentsProps = {

} & API.Coinbank

function HomeScreenComponents({ name, value, ...props }: HomeScreenComponentsProps) {

	if (!value) value = 0;

	function Contributions({ name, value }: { name: string, value: number }) {
		if (!value) value = 0;
		return (
			<View>
				<Text
					style={{ ...AppStyles.text, ...DryStyles['h2-sub'] }}>
					{name} Saved
				</Text>
				<Text
					style={{ ...AppStyles.text, ...DryStyles['h2'] }}>
					${value.toFixed(2)}
				</Text>
			</View>
		)
	}

	return (
		<>
			<View style={{ gap: 15 }}>
				<View>
					<Text
						style={{ ...AppStyles.text, ...DryStyles['h1-sub'] }}>
						Your Balance
					</Text>
					<Gradient.Mask
						gradienttype='gradient-2'
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 4 }}
						angle={101}
						useAngle={true}
					>
						<Text
							style={{ ...AppStyles.text, ...DryStyles['h1'] }}>
							${value?.toFixed(2)}
						</Text>
					</Gradient.Mask>
				</View>
				<Contributions name='Black' value={value} />
				<View>
					<Text
						style={{ ...AppStyles.text, ...DryStyles['h2-sub'] }}>
						You Saved
					</Text>
					<Text
						style={{ ...AppStyles.text, ...DryStyles['h2'] }}>
						$100.12
					</Text>
				</View>
			</View>
			<Gradient style={{ height: 3, borderRadius: 12, marginTop: 18, marginBottom: 18 }} />
			<View style={{ gap: 48, ...DryStyles['flex-row'], ...DryStyles['justify-center'] }}>
				<HomeButton
					icon='deposit'
					text='Deposit'
				/>
				<HomeButton
					icon='withdraw'
					text='Withdraw'
				/>
				<HomeButton
					icon='audit'
					text='Audit'
				/>
			</View>
		</>
	)
}
