import { Modal, Pressable, View, Text, TextInput } from "react-native";
import { ModalStyle } from "../styles/modal.styles";
import { AppStyles, DryStyles } from "../styles/global.styles";
import { BlurView } from "@react-native-community/blur";
import Gradient from "./Gradient";
import Circle from "../../assets/icons/circle.svg";
import { useCallback, useContext, useEffect, useState } from "react";
import { API } from "../api/request";
import { printMoney } from "../util/money";
import { InputBox } from "./InputBox";
import { CoinbankContext } from "../screens/Screen";

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

	function ButtonAddition({ value }: { value: number }) {
		function add() {
			const parsedisplay = parseFloat(display);
			if (isNaN(parsedisplay)) {
				return;
			}
			setDisplay((value + parsedisplay).toFixed(2));
		}

		return (
			<Pressable
				style={{ ...ModalStyle['under-circle-button'], ...DryStyles['flex-center'] }}
				onPress={() => {
					add();
				}
				}>
				<Text style={{ ...AppStyles.text, ...ModalStyle['under-circle-text'] }}>{value}</Text>
			</Pressable>
		)
	}


	return (
		<View style={{ ...DryStyles['align-center'], gap: 0, marginTop: 10 }}>
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
			<View style={{ ...DryStyles['flex-row'], gap: 10 }}>
				<ButtonAddition value={.01} />
				<ButtonAddition value={.05} />
				<ButtonAddition value={.10} />
				<ButtonAddition value={.25} />
				<ButtonAddition value={1.00} />
			</View>
			<View style={{ ...DryStyles['align-center'], marginTop: 30, gap: 20 }}>
				<ModalButton onPress={() => { onDeposit(display) }} text="Deposit" />
				<ModalButton onPress={() => { close(false); }} text="Cancel" primary={false} />
			</View>
		</View>
	)
}

CustomModal.Withdraw = ({ onWithdraw = (value: string) => { }, close = () => { } }: { onWithdraw: Function, close: Function }) => {

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

	function ButtonAddition({ value }: { value: number }) {
		function add() {
			const parsedisplay = parseFloat(display);
			if (isNaN(parsedisplay)) {
				return;
			}
			setDisplay((value + parsedisplay).toFixed(2));
		}
		return (
			<Pressable
				style={{ ...ModalStyle['under-circle-button'], ...DryStyles['flex-center'] }}
				onPress={() => {
					add();
				}
				}>
				<Text style={{ ...AppStyles.text, ...ModalStyle['under-circle-text'] }}>{value}</Text>
			</Pressable>
		)
	}

	return (
		<View style={{ ...DryStyles['align-center'], gap: 0, marginTop: 10 }}>
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
			<View style={{ ...DryStyles['flex-row'], gap: 10 }}>
				<ButtonAddition value={.01} />
				<ButtonAddition value={.05} />
				<ButtonAddition value={.10} />
				<ButtonAddition value={.25} />
				<ButtonAddition value={1.00} />
			</View>
			<View style={{ ...DryStyles['align-center'], marginTop: 30, gap: 20 }}>
				<ModalButton onPress={() => { onWithdraw(display) }} text="Withdraw" />
				<ModalButton onPress={() => { close(false); }} text="Cancel" primary={false} />
			</View>
		</View>
	)
}

type EditTransactionProps = {
	obj: Partial<API.Transaction>;
	onComplete: (obj: Partial<API.Transaction>) => void;
	close: (boolean: boolean) => void;
}

CustomModal.EditTransaction = ({ obj, onComplete = (obj: Partial<API.Transaction>) => { }, close = () => { } }: EditTransactionProps) => {

	const [display, setDisplay] = useState<string>('0.00');
	const AppContext = useContext(CoinbankContext);

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

	const getCoinbank = useCallback((id: number) => {
		return AppContext.data.coinbanks?.find((coinbank) => coinbank.coinbank_id === id);
	}, [AppContext.data])

	const getUsers = useCallback(() => {
		return getCoinbank(obj?.coinbank_id ?? 0)?.contributer
	}, [obj])


	return (
		<View style={{ ...DryStyles['align-center'], gap: 0, marginTop: 20 }}>
			<View style={{ ...ModalStyle['dialog-box'], ...DryStyles['align-center'] }}>
				<Text style={{ ...AppStyles['text'], ...ModalStyle['dialog-box-header'], textAlign: 'center', marginTop: 10 }}>
					{obj?.value ?? 0 > 0 ? 'Deposit ' : 'Withdraw '}
					of {printMoney(obj?.value ?? 0)}
				</Text>
				<View style={{ marginTop: 15, gap: 7.5 }}>
					<View style={{ gap: 5 }}>
						<Text style={{ ...AppStyles['text'], ...ModalStyle['dialog-box-subheader'] }}>Depositer:</Text>
						<InputBox.Dropdown
							options={
								getUsers()?.map((contributor) => {
									return {
										display: contributor.username,
										id: contributor.user_id
									}
								}) ?? []
							}
							defaultValue={
								{
									display: getUsers()?.find(usr => usr.user_id === obj.user_id)?.username ?? 'Select Depositer',
									id: obj.user_id ?? 0
								}
							}
							placeholder='Depositer'
						/>

					</View>
					<View style={{ gap: 5 }}>
						<Text style={{ ...AppStyles['text'], ...ModalStyle['dialog-box-subheader'] }}>Amount:</Text>
						<InputBox
							placeholder='Amount'
							type='text'
						/>
					</View>
				</View>
			</View>
			<View style={{ ...DryStyles['align-center'], marginTop: 110, gap: 20 }}>
				<ModalButton onPress={() => { onComplete(obj) }} text="Save" />
				<ModalButton onPress={() => { close(false); }} text="Cancel" primary={false} />
			</View>
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
