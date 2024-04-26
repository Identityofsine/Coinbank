import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

const AppColors = {
	'background-color': '#020202',
	'primary-color': '#ffffff',
}


const AppStyles = StyleSheet.create({
	safeViewContainer: {
		marginTop: 0,
		backgroundColor: AppColors["background-color"],
		flex: 1,
	},
	viewContainer: {
		marginTop: 14,
		paddingLeft: 25,
		paddingRight: 25,
		backgroundColor: AppColors["background-color"]
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
	'flex-space-between': {
		justifyContent: 'space-between'
	},
	'flex-space-around': {
		justifyContent: 'space-around'
	},
	'flex-space-evenly': {
		justifyContent: 'space-evenly'
	},
	'flex-start': {
		justifyContent: 'flex-start'
	},
	'flex-end': {
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
	}
}

export { AppStyles, AppColors, DryStyles };
