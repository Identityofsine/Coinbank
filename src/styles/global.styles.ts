import { StyleSheet } from "react-native";

const AppColors = {
	'background-color': '#020202',
	'primary-color': '#ffffff',
}


const AppStyles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
		backgroundColor: AppColors["primary-color"]
	}
});

export { AppStyles, AppColors };
