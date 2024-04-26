import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { AppStyles } from "../styles/global.styles";
import NavigationBar from "../components/NavigationBar";

type ScreenProps = {
	navBar?: boolean;
	children: React.ReactNode | React.ReactNode[] | null;
};

export function AsScreen({ navBar = true, children }: ScreenProps) {
	return (
		<SafeAreaView
			style={{ ...AppStyles.safeViewContainer }}
		>
			<ScrollView>
				{navBar && <NavigationBar />}
				<View
					style={{ ...AppStyles.viewContainer }}
				>
					{children}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export const defaultScreenOptions = {
	headerShown: false,
};
