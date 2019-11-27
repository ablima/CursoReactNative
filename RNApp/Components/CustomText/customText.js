import React from 'react';
import {View, Text} from 'react-native';

class CustomText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }

        setInterval(function(){
            this.setState({
                count: this.state.count + 1
            });
        }.bind(this), 1000);
    }

    render() {
        return (
            <View>
                <Text style={{fontSize: 54, padding: 16}}>
                    {this.props.text + " - " + this.state.count}
                </Text>
            </View>
        );
    }

}

export default CustomText;