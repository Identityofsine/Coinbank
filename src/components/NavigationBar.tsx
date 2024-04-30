import { Text, TouchableOpacity, View } from "react-native";
import { AppStyles, DryStyles } from "../styles/global.styles";
import NavButton from '../../assets/icons/nav-vector.svg';
import Gradient from "./Gradient";
import { InputBox } from "./InputBox";
import { NavbarStyles } from "../styles/navbar.styles";
import { determineColor } from "../util/colorbrightness";
import { useContext, useEffect } from "react";
import { printMoney } from "../util/money";
import { CoinbankContext } from "..";

function NavigationBar() {

	const { data, setData } = useContext(CoinbankContext);

	return (
		<View style={{ ...DryStyles['flex-row'] }}>
			<View style={{ ...DryStyles['screen-padding'], ...DryStyles['flex'], ...DryStyles['flex-row'], ...DryStyles['space-between'], ...DryStyles['align-center'] }}>
				<Gradient.Mask gradienttype='gradient-1'>
					<NavButton />
				</Gradient.Mask>
				<InputBox.Picker
					options={
						[...data.coinbanks?.map((coinbank, idx) => ({
							display: `${coinbank.emoji ? coinbank.emoji + " " : ""}${coinbank.name} - ${printMoney(coinbank.value)}`, id: idx, key: coinbank.coinbank_id
						})) ?? []
						]}
					defaultValue={(data.coinbanks?.[data.current_coinbank ?? 0].coinbank_id) ?? 0}
					onChange={(value) => {
						setData("current_coinbank", (old) => {
							if (!value || value < 0) {
								if (old) return old;
								return 0;
							}
							return value;
						});
					}}
				>
					<CoinJarLabel
						id={`$data.coinbanks?.[data.current_coinbank ?? 0].coinbank_id ?? ""}`}
						color='#23ce6b'
						name={data.coinbanks?.[data.current_coinbank ?? 0].name ?? ""}
						emoji={data.coinbanks?.[data.current_coinbank ?? 0].emoji ?? ""}
					/>
				</InputBox.Picker>
			</View>
		</View >
	)
}


type CoinJarLabelProps = {
	id: string;
	name: string;
	emoji?: string;
	color?: string;
}
function CoinJarLabel({ id, name = "", emoji = "", color = "#23CE6B" }: CoinJarLabelProps) {
	return (
		<View style={{ ...NavbarStyles["coinjar-indicator-container"], ...DryStyles['flex-center'], backgroundColor: color }}>
			{emoji === "" &&
				<Text style={{ ...AppStyles['text'], ...NavbarStyles['coinjar-text'], color: determineColor(color) }}>{name.at(0)?.toUpperCase()}</Text>
			}
			{emoji !== "" &&
				<Text style={{ ...NavbarStyles['coinjar-emoji'], color: determineColor(color) }}>{emoji}</Text>
			}
		</View>
	)
}

export default NavigationBar
