import {createAction} from 'redux-actions';

export const loadPermissionsRequest = createAction('ROLE_MANAGER/LOAD_PERMISSIONS_REQUEST');
export const loadPermissionsSuccess = createAction('ROLE_MANAGER/LOAD_PERMISSIONS_SUCCESS');
export const loadPermissionsFailure = createAction('ROLE_MANAGER/LOAD_PERMISSIONS_FAILURE');

export const loadRolesRequest = createAction('ROLE_MANAGER/LOAD_ROLES_REQUEST');
export const loadRolesSuccess = createAction('ROLE_MANAGER/LOAD_ROLES_SUCCESS');
export const loadRolesFailure = createAction('ROLE_MANAGER/LOAD_ROLES_FAILURE');

export const saveRoleRequest = createAction('ROLE_MANAGER/SAVE_ROLE_REQUEST');
export const saveRoleSuccess = createAction('ROLE_MANAGER/SAVE_ROLE_SUCCESS');
export const saveRoleFailure = createAction('ROLE_MANAGER/SAVE_ROLE_FAILURE');

export const updateRoleRequest = createAction('ROLE_MANAGER/UPDATE_ROLE_REQUEST');
export const updateRoleSuccess = createAction('ROLE_MANAGER/UPDATE_ROLE_SUCCESS');
export const updateRoleFailure = createAction('ROLE_MANAGER/UPDATE_ROLE_FAILURE');

export const removeRoleRequest = createAction('ROLE_MANAGER/REMOVE_ROLE_REQUEST');
export const removeRoleSuccess = createAction('ROLE_MANAGER/REMOVE_ROLE_SUCCESS');
export const removeRoleFailure = createAction('ROLE_MANAGER/REMOVE_ROLE_FAILURE');

