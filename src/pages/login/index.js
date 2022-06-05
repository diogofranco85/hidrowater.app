import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, View, ActivityIndicator, Text } from 'react-native';
import { Center } from '../../components/center';
import { Container } from '../../components/container';

import Logo from '../../assets/logo.png'
import { Card, CardInput, CardText } from '../../components/card';
import { useAuth } from '../../hooks/auth';
import { Button } from 'react-native-paper';


export default function Login({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loading } = useAuth();

    function userLogin() {
        signIn({
            email: username,
            password: password,
            flow: 'web'
        })
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="teal" />
                <Text color="teal">Carregando ...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, width: '100%' }}
        >
            <Center>
                <Image source={Logo} style={{ height: 200 }} />
                <Card>
                    <CardText>Nome de usuário</CardText>
                    <CardInput
                        placeholder="entre com seu e-mail"
                        autofocus
                        keyboardType="email-address"
                        placeholderTextColor="#888"
                        value={username}
                        onChangeText={setUsername}
                        autoCorrect={false}
                        returnKeyType="next"
                    />
                </Card>
                <Card>
                    <CardText>Senha de acesso</CardText>
                    <CardInput
                        placeholder="entre com sua senha"
                        placeholderTextColor="#888"
                        value={password}
                        onChangeText={setPassword}
                        autoCorrect={false}
                        secureTextEntry={true}
                        returnKeyType="go"
                        onSubmitEditing={userLogin}
                    />
                </Card>
                <Button mode="contained" style={{ marginTop: 10, width: "100%" }} icon="arrow-right" onPress={userLogin} >Conectar </Button>

            </Center>
        </KeyboardAvoidingView>
    )
}