import { Text, View } from "react-native";
import { AppStyles, DryStyles } from "../styles/global.styles";

function NavigationBar() {

	return (
		<View style={{ ...DryStyles['flex-row'] }}>
			<View style={{ ...DryStyles['screen-padding'], ...DryStyles['flex'], ...DryStyles['flex-row'], ...DryStyles['flex-space-between'] }}>
				<Text style={{ ...AppStyles.text }}>Hello, World!</Text>
				<Text style={{ ...AppStyles.text }}>Hello, World!</Text>
			</View>
		</View>
	)
}

export default NavigationBar
