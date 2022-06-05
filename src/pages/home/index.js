import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Appbar, Card, Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { ScrollView } from 'react-native';

export default function Home() {
    const { item } = useSelector(state => state.farms);
    const { signOut } = useAuth();
    const navigation = useNavigation();

    function _goBack() {
        navigation.navigate('checkin');
    }

    function _goAccount() {
        navigation.navigate('account');
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction color='white' onPress={_goBack} />
                <Appbar.Content color='white' title="Hidrowater" subtitle="Gestão de autorgas" />
                <Appbar.Action color='white' icon="account" onPress={_goAccount} />
                <Appbar.Action color='white' icon="door-open" onPress={signOut} />
            </Appbar.Header>
            <View style={{ marginTop: 0, height: 800 }}>
                <MapView
                    style={{ marginTop: 0, marginBottom: 10, width: '100%', height: '30%' }}
                    initialRegion={{
                        longitude: Number(item.longitude),
                        latitude: Number(item.latitude),
                        latitudeDelta: 3,
                        longitudeDelta: 3,
                    }}
                    zoom={70}
                    mapType="hybrid"
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    rotateEnabled={false}
                    scrollEnabled={false}
                >
                    <Marker
                        key={1}
                        coordinate={{
                            longitude: Number(item.longitude),
                            latitude: Number(item.latitude),
                        }}
                        title={item.name}
                        description={`Responsável: ${item.responsible}`}
                    />
                </MapView>
                <Card mode='elevated' style={{ margin: 5 }}>
                    <Card.Title
                        title={item.name}
                        subtitle={`Responsável: ${item.responsible}`}
                        left={(props) => <Avatar.Icon {...props} color="#fff" icon="folder" />}
                    />

                </Card>
                <Card color="#E3F2FD" mode='elevated' style={{ margin: 5 }}>
                    <Card.Content>
                        <ScrollView>
                            <Card style={{ marginBottom: 5 }}>
                                <Card.Title
                                    title="Dados para medição"
                                    subtitle="Listagem de hidrometros cadastrados"
                                    left={(props) => <Avatar.Icon {...props} color="#fff" icon="ruler" />}
                                />
                                <Card.Actions>
                                    <Button mode="outlined" icon="magnify">Acessar</Button>
                                </Card.Actions>
                            </Card>
                            <Card style={{ marginBottom: 5 }}>
                                <Card.Title
                                    title="Informar leitura"
                                    subtitle="Realizar leitura dos dados do hidrometro no local"
                                    left={(props) => <Avatar.Icon {...props} color="#fff" icon="file-edit" />}
                                />
                                <Card.Actions>
                                    <Button mode="outlined" icon="arrow-right">Acessar</Button>
                                </Card.Actions>
                            </Card>
                            <Card style={{ marginBottom: 5 }}>
                                <Card.Title
                                    title="Relatório"
                                    subtitle="Visualizar dados lançados"
                                    left={(props) => <Avatar.Icon {...props} color="#fff" icon="text-box-check" />}
                                />
                                <Card.Actions>
                                    <Button mode="outlined" icon="arrow-right">Acessar</Button>
                                </Card.Actions>
                            </Card>
                        </ScrollView>
                    </Card.Content>
                </Card>
            </View>
        </>
    )
}