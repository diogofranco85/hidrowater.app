import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { View, Text } from 'react-native';
import { Appbar, Avatar, Button, Card, Dialog, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

export default function Account() {
    const navigation = useNavigation();
    const { loading, setLoading } = useState(false);
    const { signOut, user } = useAuth();
    const { visible, setVisible } = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator />
                <Text>Carregando ...</Text>
            </View>
        )
    }

    function _goBack() {
        navigation.navigate('home');
    }

    function FrmDialog({ visible, close }) {

        setVisible(true);

        return (
            <Dialog visible={stateVisible} onDismiss={close}>
                <Dialog.Title>Alterar senha</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Digite sua senha atual e a nova senha para alterar</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="green">Alterar</Button>
                    <Button color="red">Cancelar</Button>
                </Dialog.Actions>
            </Dialog>
        )
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction color='white' onPress={_goBack} />
                <Appbar.Content color='white' title="Hidrowater" subtitle="Gestão de autorgas" />
                <Appbar.Action color='white' icon="door-open" onPress={signOut} />
            </Appbar.Header>
            <Card mode='elevated' style={{ margin: 5 }}>
                <Card.Title
                    title="Meus dados"
                    subtitle={user.name}
                    left={(props) => <Avatar.Icon {...props} color="#fff" icon="account" />}
                />

            </Card>
            <Card mode='elevated' style={{ margin: 5 }}>
                <Card.Title
                    title="Email"
                    subtitle={user.email}
                />

            </Card>
            <Card mode='elevated' style={{ margin: 5 }}>
                <Card.Title
                    title="Perfil"
                    subtitle='APP'
                />
            </Card>
            <Card mode='elevated' style={{ margin: 5 }}>
                <Card.Title
                    title="Alterar senha"
                />
                <Card.Actions>
                    <Button color="green" onPress={showDialog} mode="contained" icon="lock">Alterar senha</Button>
                </Card.Actions>
            </Card>

            <Card mode='elevated' style={{ margin: 5 }}>
                <Card.Title
                    title="Desconectar"
                />
                <Card.Actions>
                    <Button color="red" onPress={signOut} icon="door-open" mode="contained">Sair do aplicativo</Button>
                </Card.Actions>
            </Card>
            <FrmDialog stateVisible={visible} close={hideDialog} />
        </>
    )
}