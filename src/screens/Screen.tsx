import React, { createContext, useEffect } from "react";
import { RefreshControlProps, SafeAreaView, ScrollView, View } from "react-native";
import { AppStyles } from "../styles/global.styles";
import NavigationBar from "../components/NavigationBar";
import { API } from "../api/request";
import { useNavigation } from "@react-navigation/native";
import { refresh } from "../api/refresh";
import { Storage } from "../util/Storage";

type ScreenProps = {
	navBar?: boolean;
	children: React.ReactNode | React.ReactNode[] | null;
	refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
};

type CoinbankContextType = {
	user_id: string;
	coinbanks: API.Coinbank[];
}

type ContextState = {
	data: Partial<CoinbankContextType>;
	setData: (key: keyof CoinbankContextType, value: any) => void;
}


export const CoinbankContext = createContext<ContextState>({ data: {}, setData: () => { } });

export function AsScreen({ navBar = true, children, refreshControl }: ScreenProps) {
	const [data, setData] = React.useState<Partial<CoinbankContextType>>({});

	const navigation = useNavigation();

	useEffect(() => {
		refresh(async (result: boolean) => {
			if (result) {
				Storage.load('user_id').then((user_id) => {
					setData({ ...data, user_id: user_id as string });
				});
				//@ts-ignore
				navigation.navigate('Home');
			} else {
				Storage.clear('user_id');
				Storage.clear('active_token');
				Storage.clear('refresh_token');
				//@ts-ignore
				navigation.navigate('Login');
			}
		})
	}, [])

	function updateData(key: keyof CoinbankContextType, value: any) {
		setData({ ...data, [key]: value });
	}

	return (
		<CoinbankContext.Provider value={{ data: data, setData: updateData }}>
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
		</CoinbankContext.Provider>
	);
}

export const defaultScreenOptions = {
	headerShown: false,
};
