import { ImageStyle, TouchableOpacity, View, ViewStyle, Text } from "react-native";
import { API } from "../api/request"
import { DryStyles } from "../styles/global.styles";
import { useContext } from "react";
import { CoinbankContext } from "../screens/Screen";
import { ContextFunctions } from "../util/ContextFunctions";
import { TransactionStyles } from "../styles/transaction.styles";
import Gradient from "./Gradient";


type TransactionProps = {
	transactions: API.Transaction[];
	onTransactionPress?: (transaction: API.Transaction) => void;
	style?: ViewStyle
}

export const Transactions = ({ transactions, onTransactionPress = (e) => { }, style = {} }: TransactionProps) => {

	return (
		<Gradient.Mask style={{ ...TransactionStyles.container, ...style }}>
			<View
				style={{ ...TransactionStyles.container, borderWidth: 1.3, borderColor: '#ffffff' }}>
				<View style={TransactionStyles["transaction-container"]}>
					{transactions.map((transaction, index) => (
						<TouchableOpacity key={index} onPress={() => onTransactionPress(transaction)}>
							<Transactions.Transaction transaction={transaction} />
						</TouchableOpacity>
					))}
				</View>
			</View>
		</Gradient.Mask>
	)
}

Transactions.Transaction = ({ transaction }: { transaction: API.Transaction }) => {
	//must be under AsScreen Context
	const AppContext = useContext(CoinbankContext);

	return (
		<View style={{ ...DryStyles['flex-row'] }}>
			<View style={{ ...TransactionStyles.transaction }}>
				<Text style={TransactionStyles["transaction-text-header"]}>${transaction.value.toFixed(2)}</Text>
				<Text style={TransactionStyles["transaction-text-subheader"]}>{ContextFunctions.getUserName(AppContext.data, transaction.user_id)}</Text>
			</View>
		</View>
	)
}
