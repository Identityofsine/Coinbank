import React, { SetStateAction, createContext, useContext, useEffect } from "react";
import { RefreshControlProps, SafeAreaView, ScrollView, View } from "react-native";
import { AppStyles } from "../styles/global.styles";
import NavigationBar from "../components/NavigationBar";
import { API } from "../api/request";
import { useNavigation } from "@react-navigation/native";
import { refresh } from "../api/refresh";
import { Storage } from "../util/Storage";
import { getCoinbanks } from "../api/getCoinbanks";
import { CoinbankContext } from "..";

type ScreenProps = {
	navBar?: boolean;
	children: React.ReactNode | React.ReactNode[] | null;
	refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
};
export function AsScreen({ navBar = true, children, refreshControl }: ScreenProps) {

	return (
		<SafeAreaView
			style={{ ...AppStyles.safeViewContainer }}
		>
			<ScrollView
				refreshControl={refreshControl}
			>
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
