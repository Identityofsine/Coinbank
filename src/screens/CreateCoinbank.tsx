import { Text, View } from "react-native";
import { CoinbankStyles } from "../styles/coinbank.styles";
import { AsScreen } from "./Screen";
import Gradient from "../components/Gradient";
import { InputBox } from "../components/InputBox";
import { ModalButton } from "../components/Modal";
import { useState } from "react";
import { createCoinbank } from "../api/createCoinbank";
import { linkCoinbank } from "../api/linkCoinbank";
import { API } from "../api/request";
import { useNavigation } from "@react-navigation/native";

export default function CreateCoinbank() {

	const navigation = useNavigation();
	const [isPending, setPending] = useState(false);
	const [isError, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [emoji, setEmoji] = useState<string>('');


	function submit() {
		console.log(name);
		setPending(true);
		setMessage('Creating Coinbank...');
		createCoinbank(name, emoji)
			.then((response) => {
				if (response) {
					setMessage('Coinbank created successfully... Linking Coinbank To You!');
					linkCoinbank(`${response.coinbank_id}`, response.user_secret)
						.then((link: API.BasicResponse) => {
							if (link.success) {
								setSuccess(true);
								setMessage('Coinbank linked successfully');
								//@ts-ignore
								navigation.navigate('Home');
							} else {
								setError(true);
								setMessage(`Failed to link coinbank (${link.message})`);
							}
						});
				} else {
					setError(true);
					setMessage(`Failed to create coinbank`);
				}
			}).finally(() => setPending(false));
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
							onChange={(text: string) => setName(text)}
						/>
					</View>
					<View style={CoinbankStyles["input-gap"]}>
						<Text style={CoinbankStyles['coinbank-label']}>Enter a Emoji:</Text>
						<InputBox
							type='emoji'
							style={CoinbankStyles["coinbank-input"]}
							placeholder='Emoji'
							onChange={(text: string) => setEmoji(text)}
						/>
					</View>
				</View>
				<View style={{ alignItems: 'center', marginTop: 20 }}>
					<ModalButton style={{ width: 339 }} onPress={() => { submit() }} text="Create Coinbank" disabled={isPending} />
				</View>
			</View>
		</AsScreen>
	)
}
