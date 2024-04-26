import { Text, View } from "react-native";
import { AppStyles, DryStyles } from "../styles/global.styles";
import NavButton from '../../assets/icons/nav-vector.svg';

function NavigationBar() {

	return (
		<View style={{ ...DryStyles['flex-row'] }}>
			<View style={{ ...DryStyles['screen-padding'], ...DryStyles['flex'], ...DryStyles['flex-row'], ...DryStyles['flex-space-between'] }}>
				<NavButton />
			</View>
		</View>
	)
}

export default NavigationBar
