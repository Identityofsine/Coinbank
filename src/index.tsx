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


export const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

	const navigation = createNavigationContainerRef();


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
