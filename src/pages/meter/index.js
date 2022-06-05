import React from 'react';
import { View } from 'react-native';

export default function Meter() {

    function _goBack() {

    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction color='white' onPress={_goBack} />
                <Appbar.Content color='white' title="Hidrowater" subtitle="Gestão de autorgas" />
                <Appbar.Action color='white' icon="account" onPress={() => { }} />
                <Appbar.Action color='white' icon="door-open" onPress={() => { }} />
            </Appbar.Header>
            <View>

            </View>
        </>
    )
}