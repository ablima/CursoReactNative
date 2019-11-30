import React from 'react';
import {View, Button, Text} from 'react-native';

import MapView, {Marker, Callout} from 'react-native-maps';

import Marker1 from './../../Assets/icons/marker1.png';
import Marker2 from './../../Assets/icons/marker2.png';
import Marker3 from './../../Assets/icons/marker3.png';

class MapScreen extends React.Component {

    constructor(props){
        super(props);

        this.initialCamera = {
            center: {
                latitude: -3.091529,
                longitude: -60.017282    
            },
            pitch: 0,
            heading: 0,
            zoom: 10,
            altitude: 16
        };

        this.markers = [
            {
                coordinate: {
                    latitude: -3.091529,
                    longitude: -60.017282
                },
                title: "EU SOU O MARKER 1",
                description: "Olá",
                status: 0
            },
            {
                coordinate: {
                    latitude: -3.0100688,
                    longitude: -59.9839064
                },
                title: "EU SOU O MARKER 2",
                description: "Olá",
                status: 1
            },
            {
                coordinate: {
                    latitude: -3.0800688,
                    longitude: -59.9439064
                },
                title: "EU SOU O MARKER 3",
                description: "Olá",
                status: 2
            }
        ];

        this.state = {
            markers: this.markers
        }

        this.centerMap = this.centerMap.bind(this);
        this.onMarkerPress = this.onMarkerPress.bind(this);
        this.addMarker = this.addMarker.bind(this);
    }

    addMarker() {
        let markers = this.state.markers;

        let minLat = -3.06;
        let maxLat = -3.08;
        let minLng = -59.94;
        let maxLng = -59.98;

        markers.push({
            coordinate: {
                latitude: (Math.random() * (minLat - maxLat) + maxLat),
                longitude: (Math.random() * (minLng - maxLng) + maxLng)
            },
            status: Math.floor((Math.random() * 3))
        });

        this.setState({
            markers: markers
        });
    }

    centerMap() {
        this._map.animateCamera(this.initialCamera);
    }

    onMarkerPress(evt) {
        console.info(evt.nativeEvent);

        this._map.animateCamera({
            center: evt.nativeEvent.coordinate,
            zoom: 16
        });
    }

    renderMarkers() {
        return this.state.markers.map((marker, i) => {

            let image;
        
            switch(marker.status){
                case 0:
                    image = Marker1;
                    break;

                case 1:
                    image = Marker2;
                    break;

                case 2:
                    image = Marker3;
                    break;
            }

            return (
                <Marker
                    draggable
                    identifier={""+i}
                    onPress={this.onMarkerPress}
                    //onDragEnd={FUNCAO PARA MANIPULAR O EVENTO DE DRAG}
                    coordinate={marker.coordinate}
                    title="TITULO"
                    description="DESCRIPTION"
                    image={image}
                >

                    <Callout tooltip={true}>
                        <View style={{
                            width: 200,
                            height: 80,
                            marginBottom: 10,
                            borderRadius: 30,
                            borderWidth: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#FBFBFB",
                            borderColor: "#CACACA"
                        }}>
                            <Text>{marker.title}</Text>
                            <Text>{marker.description}</Text>
                        </View>    
                    </Callout>

                </Marker>
            );
        });
    }

    render() {
        return (
            <View style={{height: "100%"}}>
                <MapView
                    ref={referencia => this._map = referencia}
                    style={{
                        width: "100%",
                        height: "90%"
                    }}

                    initialCamera={this.initialCamera}
/*
                    initialRegion={{
                        latitude: -3.091529,
                        longitude: -60.017282,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
*/
                >
                    {this.renderMarkers()}
                </MapView>
                <Button title="Center map" onPress={this.centerMap} />
                <Button title="Add marker" onPress={this.addMarker} />
            </View>
        );
    }

}

export default MapScreen;