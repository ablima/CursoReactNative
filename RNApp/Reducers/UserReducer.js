import {combineReducers} from 'redux';

const INITIAL_STATE = {
    currentUser: null,
    profiles: [
        {'admin': 'Admin'},
        {'dev': 'Developer'}
    ]
}

/*
state;

setState({
    ...state,
    modificacao
});
*/

const userReducer = function(state = INITIAL_STATE, action){
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'DELETE_USER':
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