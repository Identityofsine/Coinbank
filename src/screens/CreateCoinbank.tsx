import { Text, View } from "react-native";
import { CoinbankStyles } from "../styles/coinbank.styles";
import { AsScreen } from "./Screen";
import Gradient from "../components/Gradient";
import { InputBox } from "../components/InputBox";
import { ModalButton } from "../components/Modal";
import { useState } from "react";

export default function CreateCoinbank() {

	const [isPending, setPending] = useState(false);
	const [isError, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState<string>('');


	function submit() {
		setPending(true);
		setMessage('Submitting...');
		setTimeout(() => {
			setPending(false);
			setSuccess(true);
		}, 2000);
	}

	return (
		<AsScreen>
			{(success || isError || isPending) &&
				<Text style={{ color: '#ffffff', fontSize: 18 }}>
					{message}
				</Text>
			}
			<View style={{ paddingBottom: '120%', width: '100%' }}>
				<Gradient.Mask gradienttype='gradient-2' useAngle angle={-90}>
					<Text style={CoinbankStyles['coinbank-title']}>Create Coinbank</Text>
				</Gradient.Mask>
				<View style={{ marginTop: 45, gap: 20 }}>
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
				<View style={{ alignItems: 'center', marginTop: 20 }}>
					<ModalButton style={{ width: 339 }} onPress={() => { submit() }} text="Create Coinbank" />
				</View>
			</View>
		</AsScreen>
	)
}
