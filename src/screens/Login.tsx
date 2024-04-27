import { Button, Pressable, Text, TextInput, View } from "react-native";
import { AsScreen } from "./Screen";
import { AppStyles, DryStyles } from "../styles/global.styles";
import Gradient from "../components/Gradient";
import React, { useEffect } from "react";
import Key from "../../assets/icons/key.svg";
import { login } from "../api/login";
import { Storage } from "../util/Storage";
import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
	const [data, setData] = React.useState({ username: '', password: '' });
	const navigation = useNavigation();
	const [isPending, setPending] = React.useState(false);

	useEffect(() => {
		setPending(true);
		Storage.load('active_token').then((token) => {
			if (token) {
				//@ts-ignore
				navigation.navigate('Home');
			}
		}).finally(() => setPending(false));
	}, [])


	function setState(key: keyof typeof data, value: string) {
		setData({ ...data, [key]: value });
	}

	async function onSubmit() {
		if (isPending) return;
		setPending(true);
		const response = await login(data.username, data.password);
		if (response) {
			if (response.status != 200) {
				console.error("Login failed: %s", response.message);
			} else {
				Storage.save('user_id', response.user_id);
				Storage.save('active_token', response.active_token);
				Storage.save('refresh_token', response.refresh_token);
				//@ts-ignore
				navigation.navigate("Home");
			}
		}
		setPending(false);
	}


	return (
		<AsScreen navBar={false}>
			{isPending && <Text>Loading...</Text>}
			<Gradient.Mask
				style={{ marginBottom: 35 }}
				gradienttype='gradient-2'
				useAngle={true}
				angle={101}
			>
				<Text style={{ ...AppStyles['text'], ...DryStyles['h1'] }}>Login</Text>
			</Gradient.Mask>
			<View style={{ gap: 10 }}>
				<View>
					<Text style={{ ...AppStyles['text'], ...DryStyles['h2'] }}>Username</Text>
					<TextInput
						style={{ ...AppStyles['input'] }}
						placeholder="Username"
						autoCorrect={false}
						autoCapitalize='none'
						value={data.username}
						onChangeText={(text) => setState('username', text)}
					/>
				</View>
				<View>
					<Text style={{ ...AppStyles['text'], ...DryStyles['h2'] }}>Password</Text>
					<TextInput
						style={{ ...AppStyles['input'] }}
						placeholder="Password"
						secureTextEntry={true}
						autoCorrect={false}
						autoCapitalize='none'
						value={data.password}
						onChangeText={(text) => setState('password', text)}
					/>
				</View>
			</View>
			<Pressable
				style={{ ...AppStyles['button-1'], ...DryStyles['flex-row'], ...DryStyles['align-center'], ...DryStyles['space-between'], marginTop: 35 }}
				onPress={() => onSubmit()}
			>
				<Text style={{ ...DryStyles['button-2-text'] }}>Login</Text>
				<Key width={24} height={24} />
			</Pressable>

		</AsScreen>
	)
}

export default LoginScreen;
