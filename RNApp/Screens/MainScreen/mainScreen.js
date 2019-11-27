import React from 'react';
import {View} from 'react-native';

import TabsNavigation from './../../Components/TabsNavigation/tabsNavigation';
import CustomText from './../../Components/CustomText/customText';

import HomeScreen from './../HomeScreen/homeScreen';
import FormScreen from './../FormScreen/formScreen';
import CameraScreen from './../CameraScreen/cameraScreen';

import HomeIcon from './../../Assets/images/homeIcon.png';
import FormIcon from './../../Assets/images/formIcon.png';
import CameraIcon from './../../Assets/images/cameraIcon.png';

class MainScreen extends React.Component {

    constructor(props){
        super(props);

        this.options = [
            {
                image: HomeIcon,
                text: "Home",
                screen: (<HomeScreen />)
            },
            {
                image: FormIcon,
                text: "Form",
                screen: (<FormScreen />)
            },
            {
                image: CameraIcon,
                text: "Camera",
                screen: (<CameraScreen />)
            }
        ];
    }

    render() {
        return (
            <View>
                <TabsNavigation options={this.options}/>
            </View>
        );
    }

}

export default MainScreen;