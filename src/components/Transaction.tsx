import { ImageStyle, TouchableOpacity, View, ViewStyle, Text, ScrollView, Pressable, RefreshControlProps, Animated, FlatList } from "react-native";
import { API } from "../api/request"
import { AppStyles, DryStyles } from "../styles/global.styles";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { CoinbankContext } from "..";
import { ContextFunctions } from "../util/ContextFunctions";
import { TransactionStyles } from "../styles/transaction.styles";
import Gradient from "./Gradient";
import { ModalStyle } from "../styles/modal.styles";
import { TimeFormat } from "../util/time";
import { InputBox } from "./InputBox";


type TransactionProps = {
	transactions: API.Transaction[];
	onTransactionPress?: (transaction: API.Transaction) => void;
	style?: ViewStyle
	refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
	isPending?: boolean
}


export const Transactions = ({ isPending = false, transactions, onTransactionPress = (e) => { }, style = {}, refreshControl }: TransactionProps) => {

	const [filter_type, setFilter] = useState<0 | 1 | 2>(0);

	const getWithDrawals = useMemo(() => {
		return transactions.filter((transaction) => transaction.value <= 0);
	}, [transactions]);

	const getDeposits = useMemo(() => {
		return transactions.filter((transaction) => transaction.value > 0);
	}, [transactions]);

	const filter = useCallback(() => {
		switch (filter_type) {
			case 1:
				return getDeposits;
			case 2:
				return getWithDrawals;
			default:
				return transactions;
		}
	}, [filter_type, transactions]);

	function onFilterChange(filter: 0 | 1 | 2) {
		setFilter(filter);
	}

	return (
		<View style={{ gap: 20, marginTop: 30 }}>
			<Text style={{ ...DryStyles['h3'], ...AppStyles['text'] }}>Transactions</Text>
			<View style={{ position: 'relative' }}>
				<Gradient.Mask
					gradienttype='gradient-2'
					style={{ width: TransactionStyles.container.width, height: TransactionStyles.container.height, borderRadius: 8, ...DryStyles['flex-center'] }}
				>
					<View style={{ width: TransactionStyles.container.width, height: TransactionStyles.container.height, borderColor: "#ffffff", borderWidth: 1.25, borderRadius: 12 }}>
					</View>
				</Gradient.Mask>

				<View style={{ width: TransactionStyles.container.width, height: TransactionStyles.container.height, ...DryStyles['absolute-center'], paddingTop: 20, paddingBottom: 20, paddingLeft: 13, paddingRight: 13 }}>
					<Transactions.Filter
						onFilterChange={onFilterChange}
					/>
					{isPending &&
						<Transactions.Skeleton />
					}
					{!isPending &&
						<ScrollView horizontal={true} style={{ width: '100%', maxHeight: '95%', marginTop: 16 }}>
							<FlatList
								style={TransactionStyles["transaction-container"]}
								refreshControl={refreshControl}
								renderItem={({ item }) => (
									<TouchableOpacity onPress={() => onTransactionPress(item)}>
										<Transactions.Transaction transaction={item} />
									</TouchableOpacity>
								)}
								data={filter()}
							/>
						</ScrollView>
					}
				</View>
			</View>
		</View >
	)
}

Transactions.Transaction = ({ transaction }: { transaction: API.Transaction }) => {
	//must be under AsScreen Context
	const AppContext = useContext(CoinbankContext);

	return (
		<View style={{ ...TransactionStyles.transaction, ...DryStyles['space-between'], ...DryStyles['flex-row'] }}>
			<View style={{}}>
				<Text style={TransactionStyles["transaction-text-header"]}>{ContextFunctions.getUserName(AppContext.data, transaction.user_id ?? -1)}</Text>
				<Text style={TransactionStyles["transaction-text-subheader"]}>
					{transaction.value > 0 ? 'Deposited ' : 'Withdrew '}
					${transaction.value.toFixed(2)}
				</Text>
			</View>
			<View style={{ ...DryStyles['flex-center'], width: 50 }}>
				<Text style={TransactionStyles["transaction-text-timestamp"]}>{TimeFormat.formatTime(new Date(transaction.created_at))}</Text>
			</View>
		</View>
	)
}

Transactions.Skeleton = () => {

	const shimmerAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const TIME = 500;
		Animated.loop(
			Animated.sequence([
				Animated.timing(shimmerAnim, {
					toValue: .9,
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
		<Animated.View style={{ ...TransactionStyles["transaction-container"], height: '100%', opacity: shimmerAnim }}>
		</Animated.View>
	)
}

type FilterProps = {
	onFilterChange?: (filter: 0 | 1 | 2) => void;
}

Transactions.Filter = ({ onFilterChange }: FilterProps) => {
	return (
		<InputBox.Dropdown
			style={{ width: 252 }}
			options={[{ display: 'All', id: 0 }, { display: 'Deposits', id: 1 }, { display: 'Withdrawals', id: 2 }]}
			placeholder={'Filter'}
			defaultValue={{ display: 'All', id: 0 }}
			onChange={(value) => {
				if (onFilterChange) onFilterChange(value.id as 0 | 1 | 2);
			}}
		/>
	)
}
