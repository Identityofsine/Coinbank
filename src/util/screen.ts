import { Dimensions } from "react-native";

export namespace ScreenMath {
	export function calculateWidthPrecentage(value: number): `${number}%` {
		const width = Dimensions.get('window').width;
		return `${(value / 100) * width}%`;
	}

	export function calculateWidth(value: number): number {
		const width = Dimensions.get('window').width;
		return (value / 100) * width;
	}

	export function calculateHeight(value: number): number {
		const height = Dimensions.get('window').height;
		return (value / 100) * height;
	}

	export function getWidth(): number {
		return Dimensions.get('window').width;
	}

	export function calc(type: 'width' | 'height', value: number): number {
		return Dimensions.get('window')[type] + value;
	}

	export function getHeight(): number {
		return Dimensions.get('window').height;
	}
}
