import { StyleSheet } from "react-native";
import { DryStyles } from "./global.styles";

export const InputBoxStyles = StyleSheet.create({
	'input-container': {
		width: 282,
		maxWidth: '100%',
		height: 43,
		backgroundColor: '#202020',
		borderRadius: 10,
		borderWidth: .5,
		borderColor: '#535353',
		paddingLeft: 15,
		...DryStyles['justify-center']
	},
	'input-emoji': {
		width: 96,
		height: 78,
		fontSize: 24,
		alignItems: 'center',
		paddingLeft: 0
	},
	'input-text': {
		fontSize: 16,
		fontWeight: '400',
		color: '#ffffff'
	},
	'input-text-placeholder': {
		fontSize: 16,
		fontWeight: '400',
		color: '#c1c1c1'
	}
});
