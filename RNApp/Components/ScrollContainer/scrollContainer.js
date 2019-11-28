import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import styles from './scrollContainer.styles';

class ScrollContainer extends React.Component {

    render() {
        return (
            <View>
                <Text style={styles.title}>{this.props.title}</Text>
                <ScrollView horizontal={this.props.horizontal}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                    {this.props.children}
                </ScrollView>
            </View>
        );
    }

}

export default ScrollContainer;