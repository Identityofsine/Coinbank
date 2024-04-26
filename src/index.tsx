/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/Home';
import { defaultScreenOptions } from './screens/Screen';
import NavigationBar from './components/NavigationBar';

type SectionProps = PropsWithChildren<{
	title: string;
}>;

export const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

	return (
		<SafeAreaView style={AppStyles.safeViewContainer}>
			<NavigationBar />
			<NavigationContainer
			>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={defaultScreenOptions}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}

export default App;
