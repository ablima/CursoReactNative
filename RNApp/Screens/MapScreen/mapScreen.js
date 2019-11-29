import React from 'react';
import {View} from 'react-native';

import MapView, {Marker} from 'react-native-maps';

class MapScreen extends React.Component {

    render() {
        return (
            <View style={{height: "100%"}}>
                <MapView
                    style={{
                        width: "100%",
                        height: "90%"
                    }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>

                    <Marker
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324
                        }}
                        title="Olá"
                        description="Eu sou um marker"
                    />

                </MapView>
            </View>
        );
    }

}

export default MapScreen;