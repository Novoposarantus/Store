import {createAction} from 'redux-actions';

export const loadUsersListRequest = createAction('USER_MANAGER/LOAD_USERS_LIST_REQUEST');
export const loadUsersListSuccess = createAction('USER_MANAGER/LOAD_USERS_LIST_SUCCESS');
export const loadUsersListFailure = createAction('USER_MANAGER/LOAD_USERS_LIST_FAILURE');

export const updateUserRequest = createAction('USER_MANAGER/UPDATE_USER_REQUEST');
export const updateUserSuccess = createAction('USER_MANAGER/UPDATE_USER_SUCCESS');
export const updateUserFailure = createAction('USER_MANAGER/UPDATE_USER_FAILURE');