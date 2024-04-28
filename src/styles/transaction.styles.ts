import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppColors, DryStyles } from "./global.styles";

export const TransactionStyles = StyleSheet.create({
	'container': {
		width: 340,
		maxWidth: '100%',
		height: 480,
		borderRadius: 15,
		...DryStyles['align-center']
	},
	'transaction-container': {
		width: 316,
		maxHeight: 80,
	},
	'transaction': {
		width: 316,
		maxWidth: '100%',
		height: 70,
		borderBottomWidth: 1.5,
		borderBottomColor: '#1c1c1c',
		...DryStyles['justify-center']
	},
	'transaction-text-header': {
		color: '#ffffff',
		fontSize: 28,
		fontWeight: 500
	},
	'transaction-text-subheader': {
		color: '#afafaf',
		fontSize: 13,
		fontWeight: 300
	},
	'transaction-text-timestamp': {
		color: '#7d7d7d',
		fontSize: 11,
		fontWeight: 300
	}
});
