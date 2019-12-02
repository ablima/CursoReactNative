import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import userReducer from './Reducers/UserReducer';

import MainScreen from './Screens/MainScreen/mainScreen';
import MapScreen from './Screens/MapScreen/mapScreen';

const store = createStore(userReducer);

const App = () => {
    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;