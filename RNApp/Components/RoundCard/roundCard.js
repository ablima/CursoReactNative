import React from 'react';
import {View, Image, Text} from 'react-native';

import styles from './round.styles';

class RoundCard extends React.Component {

    render() {
        return (
            <View style={styles.card}>
                <Image style={styles.image} 
                       source={this.props.image} />
                <Text style={styles.text}>
                    {this.props.text}
                </Text>
            </View>
        );
    }

}

export default RoundCard;