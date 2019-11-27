import React from 'react';
import {View} from 'react-native';
import CustomText from './../../Components/CustomText/customText';

class MainScreen extends React.Component {

    render() {
        return (
            <View>
                <CustomText text="textoA" />
                <CustomText text="textoB" />
                <CustomText text="textoC" />
                <CustomText text="textoD" />
            </View>
        );
    }

}

export default MainScreen;