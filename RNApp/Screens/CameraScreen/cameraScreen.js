import React from 'react';
import {View, Button, Text} from 'react-native';

import { setUser, deleteUser } from './../../Actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CameraScreen extends React.Component {

    render() {

        console.info("CAMERA");
        console.info(this.props.user);

        return (
            <View>
                <Text style={{fontSize: 50}}>
                    Camera Screen
                </Text>
                <Text style={{fontSize: 50}}>
                    {this.props.user.currentUser ? this.props.user.currentUser.name : ""}
                </Text>
                <Button title="Set user as Andre" onPress={() => this.props.setUser({
                    name: "André"
                })} />
                <Button title="Set user as Walter" onPress={() => this.props.setUser({
                    name: "Walter"
                })} />
                <Button title="Delete user" onPress={this.props.deleteUser} />
            </View>
            
        );
    }

}

const mapStateToProps = function(state){
    const { user } = state;
    return { user };
}

const mapDispatchToProps = function(dispatch){
    return bindActionCreators({
        setUser,
        deleteUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);