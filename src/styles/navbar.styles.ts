import { StyleSheet } from "react-native";
import { AppColors, AppStyles } from "./global.styles";
import { ScreenMath } from "../util/screen";

export const NavbarStyles = StyleSheet.create({
	'navmenu': {
		height: ScreenMath.getHeight() + 80,
		width: '0%',
		overflow: 'hidden',
		position: 'absolute',
		left: 0,
		top: -80,
		zIndex: 10000,
	},
	'navmenu-container': {
		height: '100%',
		width: '100%',
		borderTopWidth: 2,
		borderRightWidth: 2,
		borderColor: AppColors['background-color'],
	},
	'navbar-internal': {
		width: ScreenMath.calculateWidth(80) - 2.1,
		height: ScreenMath.calculateHeight(136.09) - 2.1,
		backgroundColor: '#101010',
		position: 'absolute',
		bottom: 40,
	},
	'navbar-text': {
		fontSize: 28,
		color: "#ffffff"
	},
	'navbar-item': {
		width: '100%',
		height: 70,
		borderTopWidth: 2.1,
		//borderBottomWidth: 2.1,
		borderColor: '#35353590',
		paddingLeft: 28,
		paddingTop: 10,
		paddingBottom: 10,
		justifyContent: 'center'
	},
	'navbar-item-light': {
		backgroundColor: '#f7f7f7',
	},
	'navbar-item-text': {
		fontSize: 18,
		color: "#FAFAFA",
		fontWeight: 500,
	},
	'navbar-item-text-light': {
		color: '#101010',
	},
	'coinjar-indicator-container': {
		borderRadius: 360,
		width: 34,
		height: 34,
		borderWidth: 4,
		borderColor: '#ffffff',
	},
	'coinjar-text': {
		fontWeight: '500',
		fontSize: 16,
	},
	'coinjar-emoji': {
		fontSize: 13,
		paddingLeft: 1.5,
	},
});
