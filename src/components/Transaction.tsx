import { TouchableOpacity, View } from "react-native";
import { API } from "../api/request"
import { DryStyles } from "../styles/global.styles";
import { Text } from "react-native-svg";
import { useContext } from "react";
import { CoinbankContext } from "../screens/Screen";
import { ContextFunctions } from "../util/ContextFunctions";
import { TransactionStyles } from "../styles/transaction.styles";


type TransactionProps = {
	transactions: API.Transaction[];
	onTransactionPress?: (transaction: API.Transaction) => void;
}

export const Transactions = ({ transactions, onTransactionPress = (e) => { } }: TransactionProps) => {

	return (
		<View style={TransactionStyles.container}>
			<View style={TransactionStyles["transaction-container"]}>
				{transactions.map((transaction, index) => (
					<TouchableOpacity key={index} onPress={() => onTransactionPress(transaction)}>
						<Transactions.Transaction transaction={transaction} />
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}

Transactions.Transaction = ({ transaction }: { transaction: API.Transaction }) => {
	//must be under AsScreen Context
	const AppContext = useContext(CoinbankContext);

	return (
		<View style={{ ...DryStyles['flex-row'] }}>
			<View>
				<Text>${transaction.value.toFixed(2)}</Text>
				<Text>{ContextFunctions.getUserName(AppContext.data, transaction.user_id)}</Text>
			</View>
		</View>
	)
}
