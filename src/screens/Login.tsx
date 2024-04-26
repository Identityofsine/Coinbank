import { Button, Pressable, Text, TextInput, View } from "react-native";
import { AsScreen } from "./Screen";
import { AppStyles, DryStyles } from "../styles/global.styles";
import Gradient from "../components/Gradient";
import React from "react";
import Key from "../../assets/icons/key.svg";

function LoginScreen() {
	const [data, setData] = React.useState({ username: '', password: '' });

	function setState(key: keyof typeof data, value: string) {
		setData({ ...data, [key]: value });
	}


	return (
		<AsScreen navBar={false}>
			<Gradient.Mask
				style={{ marginBottom: 35 }}
				gradienttype='gradient-2'
				useAngle={true}
				angle={101}
			>
				<Text style={{ ...AppStyles['text'], ...DryStyles['h1'] }}>Login</Text>
			</Gradient.Mask>
			<View style={{ gap: 30 }}>
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
				style={{ ...AppStyles['button-1'], ...DryStyles['flex-row'], ...DryStyles['align-center'], ...DryStyles['space-between'], marginTop: 20 }}
				onPress={() => console.log(data)}
			>
				<Text style={{ ...DryStyles['button-2-text'] }}>Login</Text>
				<Key width={24} height={24} />
			</Pressable>

		</AsScreen>
	)
}

export default LoginScreen;
