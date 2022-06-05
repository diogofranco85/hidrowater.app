import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../pages/login';

const Stack = createNativeStackNavigator();

function Public() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Public;