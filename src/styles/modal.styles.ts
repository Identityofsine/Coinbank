import { StyleSheet } from "react-native";

const ModalStyle = StyleSheet.create({
	modal: {
		minWidth: '88.17948718%',
		height: 540,
		marginBottom: 80,
		backgroundColor: 'rgba(16, 16, 16, 0.725)',
		borderRadius: 8,
	},
	text: {
		fontSize: 26,
		fontWeight: 500
	},
	circle: {
		width: 256,
		height: 256,
	},
	'circle-text': {
		fontSize: 42,
		fontWeight: 300
	},
	'under-circle-text': {
		fontSize: 20,
		fontWeight: 500,
	},
	'under-circle-button': {
		width: 56,
		height: 53,
		backgroundColor: '#101010',
		borderRadius: 4,
		borderColor: '#919191',
		borderWidth: 1,
	}

});

export { ModalStyle };