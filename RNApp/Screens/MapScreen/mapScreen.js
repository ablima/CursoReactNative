import React from 'react';
import {View, Text, Button} from 'react-native';

import MapView, {Marker, Callout} from 'react-native-maps';

import Marker1 from './../../Assets/icons/marker1.png';
import Marker2 from './../../Assets/icons/marker2.png';
import Marker3 from './../../Assets/icons/marker3.png';

class MapScreen extends React.Component {

    constructor(props){
        super(props);

        this.startLatCoord = -3.06;
        this.endLatCoord = -3.08;
        this.startLongCoord = -59.94;
        this.endLongCoord = -59.98;

        this.initialCamera = {
            center: {
                latitude: -3.0700688,
                longitude: -59.9839064
            },
            //pitch: 90,
            pitch: 0,
            heading: 1,
            zoom: 12
        };

        this.markers = [
            {
                coordinate: {
                    latitude: -3.0700688,
                    longitude: -59.9839064
                },
                title: "Olá",
                description: "Eu sou um marker",
                status: 0
            },
            {
                coordinate: {
                    latitude: -3.0100688,
                    longitude: -59.9839064
                },
                title: "Olá",
                description: "Eu sou um marker 2",
                status: 1
            },
            {
                coordinate: {
                    latitude: -3.0500688,
                    longitude: -59.9439064
                },
                title: "Olá",
                description: "Eu sou um marker 3",
                status: 2
            }
        ];

        this.state = {
            markers: this.markers
        }

        this.addMarker = this.addMarker.bind(this);
        this.goToMarker = this.goToMarker.bind(this);
        this.centerMap = this.centerMap.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);
    }

    centerMap() {
        this._map.animateCamera(this.initialCamera);
    }

    addMarker() {
        let markers = this.state.markers;
        markers.push({
            coordinate: {
                latitude: (Math.random() * (this.startLatCoord - this.endLatCoord) + this.endLatCoord),
                longitude: (Math.random() * (this.startLongCoord - this.endLongCoord) + this.endLongCoord)
            },
            title: "Olá",
            description: "Eu sou um marker " + (markers.length + 1),
            status: (Math.floor(Math.random() * 3))
        });

        this.setState({
            markers: markers
        })
    }

    goToMarker(evt) {
        this._map.animateCamera({
            center: evt.nativeEvent.coordinate,
            zoom: 16
        });
    }

    renderMarkers() {
        return this.state.markers.map(marker => {

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
                    image = Marker1;
            }

            return (
                <Marker
                    draggable
                    onPress={this.goToMarker}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.description}
                    image={image}
                >

                    <Callout tooltip={true}>
                        <View style={{
                                backgroundColor: "#FBFBFB",
                                width: 200,
                                height: 80,
                                marginBottom:10,
                                borderRadius: 30,
                                borderWidth: 1,
                                alignItems: "center",
                                justifyContent: "center",
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
                    ref={r => this._map = r}
                    style={{
                        width: "100%",
                        height: "80%"
                    }}

                    minZoomLevel={2}
                    //showsTraffic={true}
                    showsBuildings={true}
                    initialCamera={this.initialCamera}
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