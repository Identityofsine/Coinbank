import { Animated, RefreshControl, Text, View } from "react-native";
import { AsScreen, CoinbankContext } from "./Screen";
import { AppColors, AppStyles, DryStyles } from "../styles/global.styles";
import Gradient from "../components/Gradient";
import Deposit from "../../assets/icons/button01.svg"
import Withdraw from "../../assets/icons/button02.svg"
import Audit from "../../assets/icons/button03.svg"
import { useContext, useEffect, useRef, useState } from "react";
import { API } from "../api/request";
import { getCoinbanks } from "../api/getCoinbanks";
import { sleep } from "../util/sleep";
import { getContributions } from "../api/getContributions";
import { Storage } from "../util/Storage";
import { useCallback } from "react";

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
	const AppContext = useContext(CoinbankContext);

	useEffect(() => {
		onRefresh();
	}, []);

	const onRefresh = useCallback(() => {
		setPending(true);
		sleep(2000).then(() => {
			getCoinbanks().then((response) => {
				if (response) {
					setCoinbanks(response.coinbanks);
				}
			})
				.finally(() => setPending(false));
		});
	}, [])

	useEffect(() => {
		if (!coinbanks) return;
		if (!AppContext) return;
		AppContext.setData('coinbanks', coinbanks);
	}, [coinbanks]);



	return (
		<AsScreen
			refreshControl={
				<RefreshControl
					refreshing={false}
					onRefresh={onRefresh}
					colors={[AppColors['primary-color']]}
					tintColor={AppColors['primary-color']}
					title='Refreshing...'
				/>
			}
		>
			{/* Flex Container at top */}
			{isPending && <HomeScreenSkeleton />}
			{!isPending && coinbanks && <HomeScreenComponents {...coinbanks?.[0]} />}
		</AsScreen>
	);
}

function HomeScreenSkeleton({ height = 325 }: { height?: number }) {
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
			<Animated.View style={{ height: height, minWidth: 100, backgroundColor: '#353535', opacity: shimmerAnim }}>

			</Animated.View>
		</>
	);
}

type HomeScreenComponentsProps = {

} & API.Coinbank

function HomeScreenComponents({ name, value, ...props }: HomeScreenComponentsProps) {

	const [contributions, setContributions] = useState<API.Contribution[]>([]);
	const AppContext = useContext(CoinbankContext);

	useEffect(() => {
		if (!AppContext) return;
		sleep(1000).then(() => {
			Storage.load('user_id').then((id) => {
				if (!id) return;
				getContributions(props.coinbank_id.toString())
					.then((response: API.GetContributionsResponse | undefined) => {
						if (response) {
							setContributions(response.contributions);
						}
					});
			});
		});
	}, [])

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

				{contributions.length === 0 && <HomeScreenSkeleton height={135} />}

				{contributions.length > 0 &&
					contributions.map((contribution, index) => (
						contribution.user_id === Number(AppContext.data?.user_id) ?
							<Contributions
								key={index}
								name='You'
								value={contribution.total}
							/>
							:
							<Contributions
								key={index}
								name={contribution.name}
								value={contribution.total}
							/>
					))
				}
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
