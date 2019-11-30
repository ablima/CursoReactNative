import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
    currentUser: null,
    profiles: [
        {'admin': 'Admin'},
        {'dev': 'Developer'}
    ]
};

const SaveUser = async function(user){
    try {
        await AsyncStorage.setItem('@currentUser', JSON.stringify(user));
    } catch (e) {
        console.error(e);
    }
}

const userReducer = function(state = INITIAL_STATE, action){
    switch(action.type) {
        case 'SET_USER':
            const { profiles } = state;
            SaveUser(action.payload);
            return {
                currentUser: action.payload,
                profiles
            };
        case 'DELETE_USER':
            SaveUser("");
            return {
                ...state,
                currentUser: null
            }
        default:
            return state
    }
};

export default combineReducers({
    user: userReducer
});