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
import { ScreenMath } from "../util/screen";

type ScreenProps = {
	navBar?: boolean;
	children: React.ReactNode | React.ReactNode[] | null;
	refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
};
export function AsScreen({ navBar = true, children, refreshControl }: ScreenProps) {

	const { data, setData } = useContext(CoinbankContext);

	return (
		<SafeAreaView
			style={{ ...AppStyles.safeViewContainer }}
		>
			<ScrollView
				style={{ height: ScreenMath.calculateHeightPrecentage(250), overflow: 'visible', zIndex: 1 }}
				refreshControl={refreshControl}
				scrollEnabled={!data.stop_scrolling}
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
	gestureEnabled: false,
};
