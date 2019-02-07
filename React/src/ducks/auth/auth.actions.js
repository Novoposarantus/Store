import {createAction} from 'redux-actions';

export const loadPermissionsRequest = createAction('AUTH/LOAD_PERMISSINS_REQUEST');
export const loadPermissionsSuccess = createAction('AUTH/LOAD_PERMISSINS_SUCCESS');
export const loadPermissionsFailure = createAction('AUTH/LOAD_PERMISSINS_FAILURE');
export const registerRequest = createAction('AUTH/REGISTER_REQUEST');
export const registerSuccess = createAction('AUTH/REGISTER_SUCCESS');
export const registerFailure = createAction('AUTH/REGISTER_FAILURE');
export const loginRequest = createAction('AUTH/LOGIN_REQUEST');
export const loginSuccess = createAction('AUTH/LOGIN_SUCCESS');
export const loginFailure = createAction('AUTH/LOGIN_FAILURE');
export const logout = createAction('AUTH/LOGOUT');