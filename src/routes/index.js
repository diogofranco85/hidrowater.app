import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import { useAuth } from '../hooks/auth';

import PrivateRoute from './private';
import PublicRoute from './public';

export default function Routes() {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="teal" />
                <Text color="teal">Carregando ...</Text>
            </View>
        );
    }

    return user ? <PrivateRoute /> : <PublicRoute />
}