import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppColors, DryStyles } from "./global.styles";
import { ScreenMath } from "../util/screen";

export const TransactionStyles = StyleSheet.create({
	'container': {
		width: ScreenMath.calculateWidth(87),
		height: 480,
		borderRadius: 18,
		...DryStyles['align-center']
	},
	'transaction-container': {
		width: '100%',
		maxHeight: '100%',
		backgroundColor: '#141414',
		borderRadius: 3
	},
	'transaction': {
		width: 316,
		maxWidth: '100%',
		paddingLeft: 14,
		paddingRight: 30,
		height: 70,
		borderBottomWidth: 1.5,
		borderBottomColor: '#1c1c1c',
		...DryStyles['justify-center'],
		...DryStyles['align-center']
	},
	'transaction-text-header': {
		fontWeight: '500',
		color: '#ffffff',
		fontSize: 28,
	},
	'transaction-text-subheader': {
		color: '#afafaf',
		fontSize: 13,
		fontWeight: '300'
	},
	'transaction-text-timestamp': {
		color: '#7d7d7d',
		width: 100,
		fontSize: 12,
		fontWeight: '400'
	}
});
