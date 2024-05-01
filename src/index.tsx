/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createContext, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { createNavigationContainerRef, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/Home';
import { defaultScreenOptions } from './screens/Screen';
import LoginScreen from './screens/Login';
import { API } from './api/request';
import { refresh } from './api/refresh';
import { Storage } from './util/Storage';
import { getCoinbanks } from './api/getCoinbanks';
import { StatusBar } from 'react-native';


export const Stack = createNativeStackNavigator();

type CoinbankWithContributuers = {
	contributer?: {
		user_id: number;
		username: string
	}[]
} & API.Coinbank

type CoinbankWithTransactions = {
	transactions?: API.Transaction[];
} & CoinbankWithContributuers

export type CoinbankContextType = {
	user_id: string;
	coinbanks: CoinbankWithTransactions[];
	current_coinbank: number;
	stop_scrolling: boolean;
}

type _state_function_type = Partial<{ [key in keyof CoinbankContextType]: CoinbankContextType[key] }>

type SetState<B extends keyof CoinbankContextType, A = Partial<CoinbankContextType[B]>> = A | ((arg: A) => A | {});

type ContextState = {
	data: Partial<CoinbankContextType>;
	setData: <T extends keyof CoinbankContextType>(key: T, value: SetState<T>) => void;
}


export const CoinbankContext = createContext<ContextState>({ data: {}, setData: () => { } });



function App(): React.JSX.Element {

	const navigation = createNavigationContainerRef();
	const [data, setData] = React.useState<Partial<CoinbankContextType>>({});

	useEffect(() => {
		if (!navigation.isReady()) return;
		(async () => {
			await refresh(async (result: boolean) => {
				if (result) {
					Storage.load('user_id').then((user_id) => {
						if (!user_id) return;
						updateData('user_id', user_id);
					});
					if (navigation.isReady())
						//@ts-ignore
						navigation.navigate('Home');
				} else {
					Storage.clear('user_id');
					Storage.clear('active_token');
					Storage.clear('refresh_token');
					if (navigation.isReady())
						//@ts-ignore
						navigation.navigate('Login');
				}
			})
			await getCoinbanks().then(async (response) => {
				const current_coinbank = await Storage.load('current_coinbank') ?? 0;
				updateData('current_coinbank', current_coinbank as number);
				updateData('coinbanks', response.coinbanks)
			})
		})();
	}, [])

	useEffect(() => {
		if (!data.current_coinbank) return;
		Storage.save('current_coinbank', data.current_coinbank ?? 0);
	}, [data.current_coinbank])


	function updateData<T extends keyof CoinbankContextType>(key: T, value: SetState<T>) {
		let response: SetState<T> = value;
		if (typeof value === 'function') {
			response = value?.(data[key] as CoinbankContextType[T]);
			if (response === undefined) return;
		}
		if (response === data[key]) return;
		setData((old_data) => ({ ...old_data, ...{ [key]: response } }));
	}



	return (
		<CoinbankContext.Provider value={{ data: { ...data }, setData: updateData }}>
			<StatusBar
				hidden={data.stop_scrolling}
				barStyle={'light-content'}
			/>
			<NavigationContainer
				ref={navigation}
			>
				<Stack.Navigator>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={defaultScreenOptions}
					/>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={defaultScreenOptions}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</CoinbankContext.Provider>
	);
}

export default App;
