import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { Button, Card, Paragraph, Appbar, Avatar, Title, Subheading } from 'react-native-paper';

import { setData, setError, setLoading, setMessage, setItem } from '../../store/farms';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native';


export default function Checkin() {

    const { user, signOut } = useAuth();
    const { data, loading, message, error } = useSelector(state => state.farms);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        async function getFarms() {
            try {
                dispatch(setLoading(true));
                const { data } = await api.get(`/farm/list/user/${user.id}`);
                dispatch(setData(data.result));
            } catch (err) {
                dispatch(setError(true))
                dispatch(setMessage(err?.response?.data?.message));
            } finally {
                dispatch(setLoading(false))
            }
        };

        getFarms();
    }, [])

    useEffect(() => {
        if (message != '') {
            if (error == true) {
                Alert.alert('Error', message);
            } else {
                Alert.alert('Sucesso', message);
            }
        }
    }, [message]);

    const goHome = (idFarm, item) => {
        dispatch(setItem(item));
        navigation.navigate('home', { idFarm })
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator />
                <Text>Carregando ...</Text>
            </View>
        )
    }

    function renderItem({ item }) {
        return (
            <Card style={{ margin: 10 }}>
                <Card.Title title={`Fazenda: ${item.name}`} />
                <Card.Content>
                    <Paragraph>Responsável: {item.responsible}</Paragraph>
                </Card.Content>
                <Card.Actions >
                    <Button mode="outlined" icon="arrow-right" onPress={() => goHome(item.id, item)} >Selecionar</Button>
                </Card.Actions>
            </Card>
        )
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={signOut} />
                <Appbar.Content title="Hidrowater" subtitle="Gestão de autorgas" />
            </Appbar.Header>
            <View style={{ flex: 1, width: '100%', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Title>Seja bem vindo !</Title>
                <Subheading>{user.name}</Subheading>
                <Avatar.Icon size={128} icon="yurt" color="white" style={{ margin: 25 }} />
                <Paragraph>Escolha a fazenda que deseja ver os dados</Paragraph>
                <FlatList data={data} keyExtractor={item => item.id} renderItem={renderItem} style={{ width: '100%' }} />
            </View>
        </>
    )
}