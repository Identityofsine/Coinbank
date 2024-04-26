import React from "react";
import { SafeAreaView, View } from "react-native";
import { AppStyles } from "../styles/global.styles";

type ScreenProps = {
	children: React.ReactNode | React.ReactNode[] | null;
};

export function AsScreen({ children }: ScreenProps) {
	return (
		<SafeAreaView
			style={{ ...AppStyles.safeViewContainer }}
		>
			<View
				style={{ ...AppStyles.viewContainer }}
			>
				{children}
			</View>
		</SafeAreaView>
	);
}

export const defaultScreenOptions = {
	headerShown: false,
};
