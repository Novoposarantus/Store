import {handleActions} from 'redux-actions';
import {combineReducers} from 'redux';

import {
    loadUsersListRequest,
    loadUsersListSuccess,
    loadUsersListFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure
} from './user-manager.actions';
const usersList = handleActions(
    {
        [loadUsersListSuccess.toString()]   : (_state,action) => action.payload,
        [updateUserSuccess.toString()]      : (state,action)  => state.map(user=>{
            if(user.userName === action.payload.userName){
                return action.payload;
            }
            return user
        }),
    },
    null
);
const isLoading = handleActions(
    {
        [loadUsersListRequest.toString()]   : (_state,_action) => true,
        [updateUserRequest.toString()]      : (_state,_action) => true,
        [loadUsersListSuccess.toString()]   : (_state,_action) => false,
        [updateUserSuccess.toString()]      : (_state,_action) => false,
        [loadUsersListFailure.toString()]   : (_state,_action) => false,
        [updateUserFailure.toString()]      : (_state,_action) => false
    },
    null
);
const error = handleActions(
    {
        [loadUsersListFailure.toString()]   : (_state,action) => action.payload,
        [updateUserFailure.toString()]      : (_state,action) => action.payload
    },
    null
);
export default combineReducers({
    usersList,
    isLoading,
    error
})