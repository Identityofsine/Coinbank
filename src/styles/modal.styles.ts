import { StyleSheet } from "react-native";

const ModalStyle = StyleSheet.create({
	modal: {
		minWidth: '89.17948718%',
		minHeight: 510,
		marginBottom: 80,
		backgroundColor: 'rgba(16, 16, 16, 0.725)',
		borderRadius: 8,
		borderColor: '#323232',
		borderWidth: 1.3
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
	},
	'dialog-box': {
		width: 306,
		minHeight: 225,
		maxHeight: 348,
		paddingBottom: 10,
		backgroundColor: '#101010',
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#323232'
	},
	'dialog-box-header': {
		fontSize: 28,
		fontWeight: '600',
	},
	'dialog-box-subheader': {
		fontSize: 18,
		fontWeight: '500',
	},
	'dialog-box-text': {
		fontSize: 14,
		fontWeight: '400',
	},
	'dialog-box-subtext': {
		fontSize: 14,
		fontWeight: '400',
		color: '#4B4B4B',
	}



});

export { ModalStyle };
