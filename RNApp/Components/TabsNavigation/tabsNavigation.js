import React from 'react';
import {View, ScrollView, Image, Text, TouchableNativeFeedback} from 'react-native';

import styles from './tabsNavigation.styles';

class TabsNavigation extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            active: 0
        }

        this.renderOptions = this.renderOptions.bind(this);    
        this.onOptionPressed = this.onOptionPressed.bind(this);
    }

    onOptionPressed(index) {
        this.setState({
            active: index
        });
    }

    renderOptions() {
/*
        for(let i=0; i<this.props.options.length; i++){
            let option = this.props.options[i];
        }

        options = [
            {
                image: "./assets/home.png",
                text: "Home",
                screen: (<HomeScreen />)
            },
            {
                image: "form.png",
                text: "Form",
                screen: (<FormScreen />)
            },
            {
                image: "./camera.png",
                text: "Camera",
                screen: (<CameraScreen />)
            }
        ];

        <TabsNavigation options={options} />
*/
        return this.props.options.map((option, i) => {
        
            let extraStyle;

            if(this.state.active == i){
                extraStyle = styles.activeOption;
            }
        
            return (
                <TouchableNativeFeedback onPress={() => this.onOptionPressed(i)}>
                    <View style={[styles.option, extraStyle]}>
                        <Image resizeMode="stretch"
                            style={styles.optionImage}
                            source={option.image} />
                        <Text styles={styles.optionText}>
                            {option.text}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            );
        });
    }

    render() {

        let screen = this.props.options[this.state.active].screen;

        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    {screen}
                </ScrollView>
                <View style={styles.navBar}>
                    {this.renderOptions()}
                </View>    
            </View>
        );
    }

}

export default TabsNavigation;