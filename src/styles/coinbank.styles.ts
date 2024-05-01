import { StyleSheet } from 'react-native'
import { AppColors, AppStyles } from './global.styles';

export const CoinbankStyles = StyleSheet.create({
	'coinbank-title': {
		fontSize: 70,
		fontWeight: '600',
	},
	'input-gap': {
		gap: 10
	},
	'coinbank-input': {
		'width': '100%',
	},
	'coinbank-label': {
		fontSize: 20,
		fontWeight: '500',
		...AppStyles.text
	}
});
