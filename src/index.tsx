/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { AppStyles, DryStyles } from './styles/global.styles';
import { createNavigationContainerRef, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/Home';
import { defaultScreenOptions } from './screens/Screen';
import NavigationBar from './components/NavigationBar';
import LoginScreen from './screens/Login';
import { refresh } from './api/refresh';
import { Storage } from './util/Storage';

type SectionProps = PropsWithChildren<{
	title: string;
}>;

export const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

	const navigation = createNavigationContainerRef();

	useEffect(() => {
		refresh((result: boolean) => {
			if (result) {
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
	})

	return (
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
	);
}

export default App;
