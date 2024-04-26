import { Text, View } from "react-native";
import { AsScreen } from "./Screen";
import { AppStyles } from "../styles/global.styles";

export function HomeScreen() {
	return (
		<AsScreen>
			<Text
				style={{ ...AppStyles.text }}>
				Home Screen
			</Text>
		</AsScreen>
	);
}
