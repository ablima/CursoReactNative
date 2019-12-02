export const setUser = function(user){
    return {
        type: 'SET_USER',
        payload: user
    };
};

export const deleteUser = function(){
    return {
        type: 'DELETE_USER'
    }
};