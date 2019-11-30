import React from 'react';
import {View, Text, Button} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser, deleteUser } from './../../Actions/UserActions';

class CameraScreen extends React.Component {

    render() {
        console.info(this.props.user);

        return (
            <View>
                <Text style={{fontSize: 50}}>
                    Camera Screen
                </Text>
                <Text style={{fontSize: 50}}>
                    {this.props.user.currentUser ? this.props.user.currentUser.name : "No user logged"}
                </Text>
                <Button title="Set user as Anderson" onPress={() => this.props.setUser({
                    name: "Anderson Lima"
                })} />
                <Button title="Set user as Priscila" onPress={() => this.props.setUser({
                    name: "Priscila Cunha"
                })} />
                <Button title="delete user" onPress={() => this.props.deleteUser()} />
            </View>
        );
    }

}

const mapStateToProps = function(state){
    const { user } = state;
    return { user };
};

const mapDispatchToProps = function(dispatch){
    return bindActionCreators({
        setUser,
        deleteUser
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);