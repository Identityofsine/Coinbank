import { Text, View } from "react-native";
import { AsScreen } from "./Screen";
import { AppStyles, DryStyles } from "../styles/global.styles";
import Gradient from "../components/Gradient";
import Deposit from "../../assets/icons/button01.svg"
import Withdraw from "../../assets/icons/button02.svg"
import Audit from "../../assets/icons/button03.svg"

type HomeButtonProps = {
	icon: 'deposit' | 'withdraw' | 'audit'
	text: string
}

function HomeButton({ icon, text }: HomeButtonProps) {
	return (
		<View
			style={{ ...DryStyles['align-center'], gap: 13 }}
		>
			{icon === 'deposit' && <Deposit />}
			{icon === 'withdraw' && <Withdraw />}
			{icon === 'audit' && <Audit />}
			<Text
				style={{ ...AppStyles.text, ...DryStyles['button-1-text'] }}
			>{text}</Text>
		</View>
	)
}

export function HomeScreen() {
	return (
		<AsScreen>
			{/* Flex Container at top */}
			<View style={{ gap: 15 }}>
				<View>
					<Text
						style={{ ...AppStyles.text, ...DryStyles['h1-sub'] }}>
						Your Balance
					</Text>
					<Gradient.Mask
						gradienttype='gradient-2'
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 4 }}
						angle={101}
						useAngle={true}
					>
						<Text
							style={{ ...AppStyles.text, ...DryStyles['h1'] }}>
							$650.24
						</Text>
					</Gradient.Mask>
				</View>
				<View>
					<Text
						style={{ ...AppStyles.text, ...DryStyles['h2-sub'] }}>
						Christine Saved
					</Text>
					<Text
						style={{ ...AppStyles.text, ...DryStyles['h2'] }}>
						$219.14
					</Text>
				</View>
				<View>
					<Text
						style={{ ...AppStyles.text, ...DryStyles['h2-sub'] }}>
						You Saved
					</Text>
					<Text
						style={{ ...AppStyles.text, ...DryStyles['h2'] }}>
						$100.12
					</Text>
				</View>
			</View>
			<Gradient style={{ height: 3, borderRadius: 12, marginTop: 18, marginBottom: 18 }} />
			<View style={{ gap: 48, ...DryStyles['flex-row'], ...DryStyles['justify-center'] }}>
				<HomeButton
					icon='deposit'
					text='Deposit'
				/>
				<HomeButton
					icon='withdraw'
					text='Withdraw'
				/>
				<HomeButton
					icon='audit'
					text='Audit'
				/>
			</View>
		</AsScreen>
	);
}
