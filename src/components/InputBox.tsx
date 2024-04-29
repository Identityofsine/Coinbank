import { Text, TextInput, View } from "react-native";
import { InputBoxStyles } from "../styles/inputbox.styles";
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";


type InputBoxProps = {
	placeholder?: string;
	type: 'text' | 'dropdown' | 'price'
}

export const InputBox = ({ placeholder = '', type }: InputBoxProps) => {
	return (
		<View style={InputBoxStyles['input-container']}>
			<TextInput
				placeholder={placeholder}
				style={InputBoxStyles['input-text']}
			/>
		</View>
	)
}

export type InputBoxDropdown = {
	display: string;
	id: number;
}

type InputBoxDropdownProps = {
	options: InputBoxDropdown[];
	defaultValue?: InputBoxDropdown;

} & Omit<InputBoxProps, 'type'>

InputBox.Dropdown = ({ options, defaultValue, placeholder }: InputBoxDropdownProps) => {

	const [current, setCurrent] = useState<InputBoxDropdown | undefined>(defaultValue);
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const renderLabel = (option: InputBoxDropdown) => {
		if (isFocused || current) {
			return (
				<Text style={InputBoxStyles['input-text']}>{option.display}</Text>
			)
		}
		return null;
	}

	return (
		<View style={InputBoxStyles['input-container']}>
			<Dropdown
				style={{ paddingRight: 10 }}
				placeholderStyle={{ ...InputBoxStyles['input-text-placeholder'] }}
				selectedTextStyle={{ ...InputBoxStyles['input-text'] }}
				inputSearchStyle={{}}
				iconStyle={{}}
				data={options}
				maxHeight={300}
				labelField={'display'}
				valueField={'id'}
				placeholder={!isFocused ? 'Select item' : '...'}
				value={current}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onChange={item => {
					setCurrent(item);
					setIsFocused(false);
				}}
			/>
		</View>
	)
}
