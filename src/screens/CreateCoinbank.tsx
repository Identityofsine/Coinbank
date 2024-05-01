import { Text, View } from "react-native";
import { CoinbankStyles } from "../styles/coinbank.styles";
import { AsScreen } from "./Screen";
import Gradient from "../components/Gradient";
import { InputBox } from "../components/InputBox";

export default function CreateCoinbank() {
	return (
		<AsScreen>
			<View style={{ paddingBottom: '120%' }}>
				<Gradient.Mask gradienttype='gradient-2' useAngle angle={-90}>
					<Text style={CoinbankStyles['coinbank-title']}>Create Coinbank</Text>
				</Gradient.Mask>
				<View style={{ marginTop: 25, gap: 20 }}>
					<View style={CoinbankStyles["input-gap"]}>
						<Text style={CoinbankStyles['coinbank-label']}>Enter the name of the coinbank*:</Text>
						<InputBox
							type='text'
							style={CoinbankStyles["coinbank-input"]}
							placeholder='Coinbank Name'
						/>
					</View>
					<View style={CoinbankStyles["input-gap"]}>
						<Text style={CoinbankStyles['coinbank-label']}>Enter a Emoji:</Text>
						<InputBox
							type='emoji'
							style={CoinbankStyles["coinbank-input"]}
							placeholder='Emoji'
						/>
					</View>
				</View>
			</View>
		</AsScreen>
	)
}
