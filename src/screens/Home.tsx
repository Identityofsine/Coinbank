import { Animated, Pressable, RefreshControl, Text, TextInput, View } from "react-native";
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
import { CustomModal, ModalButton } from "../components/Modal";
import { useRevertableFeedback } from "../util/useRevertableFeedback";
import { deposit } from "../api/deposit";
import { Transactions } from "../components/Transaction";
import { getTransactions } from "../api/getTransactions";
import { printMoney } from "../util/money";
import { setTransaction } from "../api/changeTransaction";
import { refresh } from "../api/refresh";
import { HomeStyle } from "../styles/home.styles";

type HomeButtonProps = {
	icon: 'deposit' | 'withdraw' | 'audit'
	text: string
	onPress?: () => void
}

type HomeModalTypes = 'deposit' | 'withdraw' | 'audit' | 'edit-transactions';

const HomeButtonStroke = { strokeWidth: .75, stroke: "#00000060" };

function HomeButton({ icon, text, onPress = () => { } }: HomeButtonProps) {


	return (
		<Pressable
			style={{ ...DryStyles['align-center'], gap: 13 }}
			onPress={onPress}
		>
			<Gradient
				gradienttype='gradient-1'
				style={HomeStyle['home-button']}
				useAngle={true}
				angle={90}
			>
				{icon === 'deposit' && <Deposit {...HomeButtonStroke} />}
				{icon === 'withdraw' && <Withdraw{...HomeButtonStroke} />}
				{icon === 'audit' && <View style={HomeStyle['audit-button']} ><Audit {...HomeButtonStroke} /></View>}
			</Gradient>
			<Text
				style={{ ...AppStyles.text, ...DryStyles['button-1-text'] }}
			>{text}</Text>
		</Pressable>
	)
}

export function HomeScreen() {

	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [modalType, setModalType] = useState<HomeModalTypes>('deposit');
	const [modalObject, setModalObject] = useState<Partial<API.Transaction>>({}); //dangerous
	const [isPending, setPending] = useState<boolean>(false);
	const [coinbanks, setCoinbanks] = useState<API.Coinbank[] | undefined>(undefined);
	const AppContext = useContext(CoinbankContext);
	const optimisticDeposit = useRevertableFeedback<number>(
		{
			value: coinbanks?.[0].value ?? 0,
			setState: (number) => {
				if (coinbanks) {
					setCoinbanks(coinbanks.map((coinbank) => {
						if (coinbank.coinbank_id === coinbanks[0].coinbank_id) {
							return { ...coinbank, value: number as number }
						}
						return coinbank;
					}))
				}
			},
			promise: async (value: number) => {
				const response = await deposit(coinbanks?.[0].coinbank_id.toString() ?? '', value.toString());
				if (response === undefined) {
					throw new Error("Deposit failed");
				}
				onRefresh(true);
				return response;
			}
		});

	useEffect(() => {
		onRefresh();
	}, []);

	const onRefresh = useCallback((ignore_pending: boolean = false) => {
		if (!ignore_pending)
			setPending(true);
		sleep(250).then(() => {
			getCoinbanks().then((response) => {
				if (response) {
					setCoinbanks(response.coinbanks);
				}
			}).finally(() => setPending(false));
		});
	}, [])

	useEffect(() => {
		if (!coinbanks) return;
		if (!AppContext) return;
		AppContext.setData('user_id', 'sex');
	}, [coinbanks]);

	function openModal(type: HomeModalTypes, data?: API.Transaction) {
		setModalType(type);
		setModalVisible(true);
		setModalObject(data ?? {});
	}

	function _deposit(value: string) {
		optimisticDeposit(parseFloat(value), parseFloat(value) + (coinbanks?.[0].value ?? 0));
		setModalVisible(false);
		setModalObject({});
	}

	function _changeTransaction(transaction: Partial<API.Transaction>) {
		setTransaction(`${coinbanks?.[0].coinbank_id}`, transaction).finally(() => { setModalObject({}); onRefresh(true); });
		setModalVisible(false);
	}

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
			<CustomModal visible={modalVisible} close={() => { }}>
				{modalType === 'deposit' && <CustomModal.Deposit onDeposit={(value: string) => { _deposit(value); }} close={() => setModalVisible(false)} />}
				{modalType === 'withdraw' && <CustomModal.Withdraw onWithdraw={() => setModalVisible(false)} close={() => setModalVisible(false)} />}
				{modalType === 'edit-transactions' && <CustomModal.EditTransaction obj={modalObject} onComplete={(trans) => { _changeTransaction(trans); setModalVisible(false); }} close={() => setModalVisible(false)} />}

			</CustomModal>

			{/* Flex Container at top */}
			{isPending && <HomeScreenSkeleton />}
			{!isPending && coinbanks && <HomeScreenComponents openModal={openModal} state_update={modalObject} {...coinbanks?.[0]} />}
			{!isPending && <HomeScreenTransactions {...coinbanks?.[0]} state_update={modalObject} onTransactionPress={(transaction: API.Transaction) => openModal('edit-transactions', transaction)} />}
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
	openModal: (type: 'deposit' | 'withdraw' | 'audit') => void
	state_update: any
} & API.Coinbank

function HomeScreenComponents({ name, value, state_update, ...props }: HomeScreenComponentsProps) {

	const [contributions, setContributions] = useState<API.Contribution[]>([]);
	const AppContext = useContext(CoinbankContext);

	useEffect(() => {
		if (!AppContext) return;
		sleep(250).then(() => {
			Storage.load('user_id').then((id) => {
				if (!id) return;
				getContributions(props.coinbank_id.toString())
					.then((response: API.GetContributionsResponse | undefined) => {
						if (response) {
							setContributions(response.contributions);
							AppContext.setData('coinbanks', (old_data) => {
								let copy = [...old_data];
								const result = copy.findIndex(coinbank => coinbank?.coinbank_id === props.coinbank_id);
								if (result === -1) {
									return {};
								}
								const coinbank = copy[result];
								if (!coinbank) return {};
								coinbank.contributer = response.contributions.map((contributer) => ({ username: contributer.username, user_id: contributer.user_id }));

								return copy;
							})
						}
					});
			});
		});
	}, [value, state_update])

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
					{printMoney(value)}
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
						gradienttype='gradient-1'
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 4 }}
						angle={-101}
						useAngle={true}
					>
						<Text
							style={{ ...AppStyles.text, ...DryStyles['h1'] }}>
							{printMoney(value)}
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
								name={contribution.username}
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
					onPress={() => props.openModal('deposit')}
				/>
				<HomeButton
					icon='withdraw'
					text='Withdraw'
					onPress={() => props.openModal('withdraw')}
				/>
				<HomeButton
					icon='audit'
					text='Audit'
				/>
			</View>
		</>
	)
}

type HomeScreenTransactionsProps = {
	state_update: any
	onTransactionPress?: (transaction: API.Transaction) => void
} & Partial<API.Coinbank>;

function HomeScreenTransactions({ state_update, onTransactionPress, ...props }: HomeScreenTransactionsProps) {

	const [transactions, setTransactions] = useState<API.Transaction[]>([]);

	useEffect(() => {
		sleep(250).then(() => {
			if (!props.coinbank_id) return;
			getTransactions(props?.coinbank_id.toString()).then((response) => {
				if (response) {
					setTransactions(response.transactions);
				}
			})
		})
	}, [state_update])

	return (
		<Transactions transactions={transactions} onTransactionPress={onTransactionPress} />
	)
}
