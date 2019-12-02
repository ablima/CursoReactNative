import React from 'react';
import {View, Button, Text, Image} from 'react-native';

import MapView, {Marker, Callout} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

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
            heading: 270,
            zoom: 10, //Android
            altitude: 10000  //iOS
        };

        this.markers = [
            {
                coordinate: {
                    latitude: -3.011529,
                    longitude: -60.017282
                },
                title: "TITULO",
                description: "DESCRIPTION",
                status: 0
            },
            {
                coordinate: {
                    latitude: -3.1393,
                    longitude: -60.3604
                },
                title: "TITULO",
                description: "DESCRIPTION",
                status: 1
            },
            {
                coordinate: {
                    latitude: -3.0100688,
                    longitude: -59.9139064
                },
                title: "TITULO",
                description: "DESCRIPTION",
                status: 2
            }
        ];

        this.state = {
            markers: this.markers
        }

        this.centerMap = this.centerMap.bind(this);
        this.onMarkerPress = this.onMarkerPress.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.getWaypoints = this.getWaypoints.bind(this);
    }

    componentDidMount() {
        if(navigator.geolocation){
            navigator.geolocation.watchPosition(pos => {
                console.info('MY POSITION');
                console.info(pos);
            });
        }
    }

    addMarker() {
        let markers = this.state.markers;

        let minLat = -3.03;
        let maxLat = -3.08;
        let minLng = -59.90;
        let maxLng = -60.00;

        //Random.range(-3.03, -3.08)

        //(Math.random() * (min - max) + max)

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

    onDirectionReady(result) {
        console.info(result.distance);
        console.info(result.duration);
    }

    getWaypoints() {
        let coordinates = [];
        this.state.markers.slice(1).map(marker => {
            coordinates.push(marker.coordinate);
        });

        return coordinates;
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

                default:
                    image = "";
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
                            backgroundColor: "#CACACA",
                            borderColor: "#CACACA"
                        }}>
                            <Text>{marker.title}</Text>
                            <Text>{marker.description}</Text>
                            <Image source={Marker1} style={{width: 40, height: 40, position: "absolute"}} />
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

                    showsTraffic={false}
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
                    
                    <MapViewDirections
                        origin={this.state.markers[0].coordinate}
                        destination={this.state.markers[1].coordinate}
                        apikey={"AIzaSyD2PXtZudNIgqqsxjrdXp3QZxcKnglmblY"}
                        optimizeWaypoints={true}
                        strokeWidth={2}
                        strokeColor="purple"
                        onReady={this.onDirectionReady}
                    />

                    <MapViewDirections
                        origin={this.state.markers[1].coordinate}
                        destination={this.state.markers[2].coordinate}
                        apikey={"AIzaSyD2PXtZudNIgqqsxjrdXp3QZxcKnglmblY"}
                        optimizeWaypoints={true}
                        strokeWidth={4}
                        strokeColor="red"
                        onReady={this.onDirectionReady}
                    />

                </MapView>
                <Button title="Center map" onPress={this.centerMap} />
                <Button title="Add marker" onPress={this.addMarker} />
            </View>
        );
    }

}

export default MapScreen;