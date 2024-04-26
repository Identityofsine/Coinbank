import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

const AppColors = {
	'background-color': '#020202',
	'primary-color': '#ffffff',
	'primary-complement': '#878787',
}


const AppStyles = StyleSheet.create({
	safeViewContainer: {
		marginTop: 0,
		backgroundColor: AppColors["background-color"],
		flex: 1,
	},
	viewContainer: {
		marginTop: 51,
		paddingLeft: 25,
		paddingRight: 25,
		backgroundColor: AppColors["background-color"]
	},
	input: {
		backgroundColor: AppColors["primary-color"],
		color: AppColors["background-color"],
		borderWidth: 1,
		borderColor: AppColors["primary-complement"],
		borderRadius: 6,
		paddingLeft: 12,
		paddingRight: 12,
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 18
	},
	'button-1': {
		backgroundColor: AppColors["primary-color"],
		borderRadius: 26,
		paddingLeft: 22.5,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
	text: {
		color: AppColors["primary-color"]
	}
});

type DryStyle = {
	[key: string]: ViewStyle | TextStyle | ImageStyle;
}

const DryStyles: DryStyle = {
	'screen-padding': {
		paddingLeft: 25,
		paddingRight: 25
	},
	'flex': {
		flex: 1
	},
	'flex-row': {
		flexDirection: 'row'
	},
	'flex-column': {
		flexDirection: 'column'
	},
	'flex-center': {
		justifyContent: 'center',
		alignItems: 'center'
	},
	'justify-center': {
		justifyContent: 'center'
	},
	'space-between': {
		justifyContent: 'space-between'
	},
	'space-around': {
		justifyContent: 'space-around'
	},
	'space-evenly': {
		justifyContent: 'space-evenly'
	},
	'justify-start': {
		justifyContent: 'flex-start'
	},
	'justify-flex-end': {
		justifyContent: 'flex-end'
	},
	'align-center': {
		alignItems: 'center'
	},
	'align-start': {
		alignItems: 'flex-start'
	},
	'align-end': {
		alignItems: 'flex-end'
	},
	'flex-grow': {
		flexGrow: 1
	},
	//text
	'h1': {
		fontSize: 72,
		fontWeight: 500
	},
	'h1-sub': {
		fontSize: 18,
		fontWeight: 300,
		color: AppColors["primary-complement"],
	},
	'h2': {
		fontSize: 46,
		fontWeight: 500
	},
	'h2-sub': {
		fontSize: 14,
		fontWeight: 300,
		color: AppColors["primary-complement"],
	},
	'button-1-text': {
		fontSize: 15,
		fontWeight: 500,
	},
	'button-2-text': {
		fontSize: 20,
		fontWeight: 500,
	},
	//dimensions
	'full-height': {
		minHeight: '100%'
	}
}


export { AppStyles, AppColors, DryStyles };
