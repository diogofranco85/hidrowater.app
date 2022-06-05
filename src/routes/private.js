import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import Home from '../pages/home';
import Checkin from '../pages/checkin';
import Account from '../pages/account';

const Stack = createNativeStackNavigator();

function Private() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='checkin' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="checkin" component={Checkin} />
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="account" component={Account} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Private;