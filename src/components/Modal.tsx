import { Modal, Pressable, View, Text, TextInput } from "react-native";
import { ModalStyle } from "../styles/modal.styles";
import { AppStyles, DryStyles } from "../styles/global.styles";
import { BlurView } from "@react-native-community/blur";
import Gradient from "./Gradient";
import Circle from "../../assets/icons/circle.svg";
import { useCallback, useEffect, useState } from "react";

type ModalProps = {
	visible: boolean;
	close: () => void;
	children?: React.ReactNode;
}

export const CustomModal = ({ visible = true, close = () => { }, children }: ModalProps) => {

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				console.log("Modal has been closed.");
			}}

		>
			<View
				style={{ ...DryStyles['flex-center'], ...DryStyles['flex'] }}
			>
				<BlurView
					blurAmount={64}
					style={{ ...ModalStyle.modal }}
				>
					{children}
				</BlurView>
			</View>
		</Modal>
	)
}

CustomModal.Deposit = ({ onDeposit = (value: string) => { }, close = () => { } }: { onDeposit: Function, close: Function }) => {

	const [display, setDisplay] = useState<string>('0.00');

	function onInput(value: string) {
		var result = value
		if (result.length === 0) {
			setDisplay("");
			return;
		}
		if (value.charAt(value.length - 1) === ".") {
		} else {
			const currencyRegex = /^(?!\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$).*$/;
			if (currencyRegex.test(result)) {
				setDisplay("" + display);
				return;
			}

		}
		setDisplay(result);
	}


	return (
		<View style={{ ...DryStyles['align-center'], gap: 10 }}>
			<View style={{ position: 'relative' }}>
				<Circle width={ModalStyle.circle.width} height={ModalStyle.circle.height} />
				<View style={{ ...DryStyles['flex-center'], position: 'absolute', left: 0, top: 0, ...ModalStyle.circle }}>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ ...AppStyles.text, ...ModalStyle['circle-text'] }}>$</Text>
						<TextInput
							style={{ ...AppStyles.text, ...ModalStyle['circle-text'], maxWidth: 140 }}
							keyboardType='number-pad'
							inputMode='numeric'
							multiline={false}
							onChangeText={(e: string) => onInput(e)}
							placeholder={'0.00'}
							value={display}
						>
						</TextInput>
					</View>
				</View>
			</View>
			<ModalButton onPress={() => { onDeposit(display) }} text="Deposit" />
			<ModalButton onPress={() => { close(false); }} text="Cancel" primary={false} />
		</View>
	)
}

export function ModalButton({ onPress, text, primary = true }: { onPress: () => void, text: string, primary?: boolean }) {

	const HEIGHT = 54;
	const WIDTH = 318;

	if (!primary) {
		return (
			<Pressable onPress={onPress}>
				<Gradient.Mask
					gradienttype='gradient-2'
					style={{ width: WIDTH, height: HEIGHT, borderRadius: 8, ...DryStyles['flex-center'] }}
				>
					<View style={{ width: WIDTH, height: HEIGHT, borderColor: "#ffffff", borderWidth: 2, borderRadius: 8 }}>
					</View>
				</Gradient.Mask>
				<View style={{ width: WIDTH, height: HEIGHT, ...DryStyles['absolute-center'], ...DryStyles['flex-center'] }}>
					<Text style={{ ...AppStyles['text'], ...ModalStyle.text }}>{text}</Text>
				</View>
			</Pressable>
		)
	}

	return (
		<Pressable onPress={onPress}>
			<Gradient useAngle={true} angle={270} style={{ width: WIDTH, height: HEIGHT, borderRadius: 8, ...DryStyles['flex-center'] }}>
				<Text style={{ ...AppStyles['text'], ...ModalStyle.text }}>{text}</Text>
			</Gradient>
		</Pressable>
	)

}
