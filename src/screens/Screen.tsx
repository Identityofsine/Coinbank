import React, { SetStateAction, createContext, useEffect } from "react";
import { RefreshControlProps, SafeAreaView, ScrollView, View } from "react-native";
import { AppStyles } from "../styles/global.styles";
import NavigationBar from "../components/NavigationBar";
import { API } from "../api/request";
import { useNavigation } from "@react-navigation/native";
import { refresh } from "../api/refresh";
import { Storage } from "../util/Storage";
import { getCoinbanks } from "../api/getCoinbanks";

type ScreenProps = {
	navBar?: boolean;
	children: React.ReactNode | React.ReactNode[] | null;
	refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
};

type CoinbankWithContributuers = {
	contributer?: {
		user_id: number;
		username: string
	}[]
} & API.Coinbank

type CoinbankWithTransactions = {
	transactions?: API.Transaction[];
} & CoinbankWithContributuers

type CoinbankContextType = {
	user_id: string;
	coinbanks: CoinbankWithTransactions[];
}

type _state_function_type = Partial<{ [key in keyof CoinbankContextType]: CoinbankContextType[key] }>

type SetState<B extends keyof CoinbankContextType, A = Partial<CoinbankContextType[B]>> = A | ((arg: A) => A | {});

type ContextState = {
	data: Partial<CoinbankContextType>;
	setData: <T extends keyof CoinbankContextType>(key: T, value: SetState<T>) => void;
}


export const CoinbankContext = createContext<ContextState>({ data: {}, setData: () => { } });

export function AsScreen({ navBar = true, children, refreshControl }: ScreenProps) {
	const [data, setData] = React.useState<Partial<CoinbankContextType>>({});

	const navigation = useNavigation();

	useEffect(() => {
		(async () => {
			await refresh(async (result: boolean) => {
				if (result) {
					Storage.load('user_id').then((user_id) => {
						if (!user_id) return;
						updateData('user_id', user_id);
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
			await getCoinbanks().then((response) => {
				updateData('coinbanks', response.coinbanks)
			})
		})();
	}, [])

	function updateData<T extends keyof CoinbankContextType>(key: T, value: SetState<T>) {
		let response: SetState<T> = value;
		if (typeof value === 'function') {
			response = value?.(data[key] as CoinbankContextType[T]);
			if (Object.keys(response).length === 0) {
				console.log(`AppContext SetState returned an empty object... ignoring!`);
				return;
			}
			if (Object.keys(data)?.findIndex((str) => key === str) === -1) {
				throw new Error(`
					Error updating CoinbankContextType! Are you updating the right key?	
				`)
			}
		}
		setData((old_data) => ({ ...old_data, ...{ [key]: response } }));
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
