import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import MainScreen from './Screens/MainScreen/mainScreen';
import MapScreen from './Screens/MapScreen/mapScreen';

const App = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="main"
                    component={MainScreen}
                    title="Main Screen"
                    initial
                />
                <Scene
                    key="map"
                    title="Map Screen"
                    component={MapScreen}
                />
            </Scene>
        </Router>
    );
}

export default App;