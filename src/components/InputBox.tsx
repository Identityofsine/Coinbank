import { Text, TextInput, View, ViewStyle } from "react-native";
import { InputBoxStyles } from "../styles/inputbox.styles";
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from "react";
import RNPickerSelect from 'react-native-picker-select';


type InputBoxProps = {
	placeholder?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	type: 'text' | 'dropdown' | 'price'
}

export const InputBox = ({ placeholder = '', type, onChange, defaultValue }: InputBoxProps) => {

	const [current, setCurrent] = useState<string | undefined>(defaultValue);

	return (
		<View style={InputBoxStyles['input-container']}>
			<TextInput
				placeholder={placeholder}
				style={InputBoxStyles['input-text']}
				value={current}
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
	onChange?: (value: InputBoxDropdown) => void;
	style?: ViewStyle;
} & Omit<Omit<Omit<InputBoxProps, 'type'>, 'onChange'>, 'defaultValue'>

InputBox.Dropdown = ({ options, defaultValue, placeholder, style, onChange }: InputBoxDropdownProps) => {

	const [current, setCurrent] = useState<InputBoxDropdown | undefined>(defaultValue);
	const [isFocused, setIsFocused] = useState<boolean>(false);

	useEffect(() => {
		if (current && onChange) onChange(current);
	}, [current]);

	return (
		<View style={{ ...InputBoxStyles['input-container'], borderColor: isFocused ? '#a2a2a2' : InputBoxStyles["input-container"].borderColor, ...style }}>
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

type PickerProps = {
	children?: React.ReactNode;
	defaultValue?: number;
	options: (InputBoxDropdown & { key: number })[];
	onChange?: (value: InputBoxDropdown['id']) => void;
}

InputBox.Picker = ({ options, defaultValue, onChange, children }: PickerProps) => {


	useEffect(() => {
		console.log('defaultValue: %s', defaultValue);
		console.log('options: %s', options);
	})

	return (
		<RNPickerSelect
			placeholder={{}}
			itemKey={defaultValue}
			darkTheme={true}
			onValueChange={(value) => onChange && onChange(value)}
			items={options.map(option => ({ label: option.display, value: option.id, key: option.key }))}
		>
			{children}
		</RNPickerSelect>
	)
}
