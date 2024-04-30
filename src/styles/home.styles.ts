
import { StyleSheet } from "react-native";
import { DryStyles } from "./global.styles";

export const HomeStyle = StyleSheet.create({
	'home-button': {
		width: 73,
		height: 75,
		borderRadius: 10,
		...DryStyles['flex-center'],
	},
	'audit-button': {
		width: '70%',
	}
});
