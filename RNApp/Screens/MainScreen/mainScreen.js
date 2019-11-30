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

import AsyncStorage from '@react-native-community/async-storage';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser } from './../../Actions/UserActions';

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

        this.getUser = this.getUser.bind(this);
    }

    componentDidMount(){
        this.getUser();
    }

    async getUser(){
        try{
            const user = await AsyncStorage.getItem('@currentUser');
            if(user !== null){
                let userObj = JSON.parse(user);
                this.props.setUser(userObj);
            }
        } catch(e) {
            console.error(e);
        }
    };

    render() {
        return (
            <View>
                <TabsNavigation options={this.options}/>
            </View>
        );
    }

}

const mapDispatchToProps = function(dispatch){
    return bindActionCreators({
        setUser
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(MainScreen);