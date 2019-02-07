import {handleActions} from 'redux-actions';
import {combineReducers} from 'redux';

import {
    loadPermissionsRequest,
    loadPermissionsSuccess,
    loadPermissionsFailure,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
} from './auth.actions';
import {authStatusType} from './auth.status-type';

const permissions = handleActions(
    {
        [loadPermissionsSuccess.toString()] : (_state,action) => action.payload,
        [loginSuccess.toString()] : (_state,action) => action.payload.permissions,
        [logout.toString()] : (_state,_action) => [],
    },
    []
);

const status = handleActions(
    {
        [loginRequest.toString()] : (_state,_action) => authStatusType.loading,
        [loginSuccess.toString()] : (_state,_action) => authStatusType.logined,
        [loginFailure.toString()] : (_state,_action) => authStatusType.logout,
        [logout.toString()] : (_state,_action) => authStatusType.logout,
    },
    localStorage.getItem('user-token') ? authStatusType.logined : authStatusType.logout
);

const isPermissionsLoading = handleActions(
    {
        [loadPermissionsRequest.toString()] : (_state,_action) => true,
        [loadPermissionsSuccess.toString()] : (_state,_action) => false,
        [loadPermissionsFailure.toString()] : (_state,_action) => false,
    },
    false
)

const error = handleActions(
    {
        [registerFailure.toString()] : (_state,action) => action.payload,
        [loginFailure.toString()] : (_state,action) => action.payload,
        [loadPermissionsFailure.toString()] : (_state,action) => action.payload,
    },
    null
);

export default combineReducers({
    permissions,
    isPermissionsLoading,
    status,
    error
})