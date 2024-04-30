import { Text, View } from "react-native";
import { AppStyles, DryStyles } from "../styles/global.styles";
import NavButton from '../../assets/icons/nav-vector.svg';
import Gradient from "./Gradient";

function NavigationBar() {

	return (
		<View style={{ ...DryStyles['flex-row'] }}>
			<View style={{ ...DryStyles['screen-padding'], ...DryStyles['flex'], ...DryStyles['flex-row'], ...DryStyles['flex-space-between'] }}>
				<Gradient.Mask gradienttype='gradient-1'>
					<NavButton />
				</Gradient.Mask>
			</View>
		</View>
	)
}

export default NavigationBar
