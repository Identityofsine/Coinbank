import { ImageStyle, TouchableOpacity, View, ViewStyle, Text, ScrollView, Pressable, RefreshControlProps } from "react-native";
import { API } from "../api/request"
import { AppStyles, DryStyles } from "../styles/global.styles";
import { useContext } from "react";
import { CoinbankContext } from "../screens/Screen";
import { ContextFunctions } from "../util/ContextFunctions";
import { TransactionStyles } from "../styles/transaction.styles";
import Gradient from "./Gradient";
import { ModalStyle } from "../styles/modal.styles";
import { TimeFormat } from "../util/time";


type TransactionProps = {
	transactions: API.Transaction[];
	onTransactionPress?: (transaction: API.Transaction) => void;
	style?: ViewStyle
	refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

export const Transactions = ({ transactions, onTransactionPress = (e) => { }, style = {}, refreshControl }: TransactionProps) => {

	return (
		<View style={{ gap: 20, marginTop: 30 }}>
			<Text style={{ ...DryStyles['h3'], ...AppStyles['text'] }}>Transactions</Text>
			<View style={{ position: 'relative' }}>
				<Gradient.Mask
					gradienttype='gradient-2'
					style={{ width: TransactionStyles.container.width, height: TransactionStyles.container.height, borderRadius: 8, ...DryStyles['flex-center'] }}
				>
					<View style={{ width: TransactionStyles.container.width, height: TransactionStyles.container.height, borderColor: "#ffffff", borderWidth: 2, borderRadius: 8 }}>
					</View>
				</Gradient.Mask>

				<View style={{ width: TransactionStyles.container.width, height: TransactionStyles.container.height, ...DryStyles['absolute-center'], ...DryStyles['align-center'] }}>
					<ScrollView
						style={TransactionStyles["transaction-container"]}
						nestedScrollEnabled={true}
						refreshControl={refreshControl}
					>
						{transactions.map((transaction, index) => {
							return (
								<TouchableOpacity key={index} onPress={() => onTransactionPress(transaction)}>
									<Transactions.Transaction transaction={transaction} />
								</TouchableOpacity>
							)
						})}
					</ScrollView>
				</View>
			</View>
		</View>
	)
}

Transactions.Transaction = ({ transaction }: { transaction: API.Transaction }) => {
	//must be under AsScreen Context
	const AppContext = useContext(CoinbankContext);

	return (
		<View style={{ ...TransactionStyles.transaction, ...DryStyles['space-between'], ...DryStyles['flex-row'] }}>
			<View style={{}}>
				<Text style={TransactionStyles["transaction-text-header"]}>{ContextFunctions.getUserName(AppContext.data, transaction.user_id)}</Text>
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
