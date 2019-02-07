import {handleActions} from 'redux-actions';
import {combineReducers} from 'redux';

import {
    loadPermissionsRequest,
    loadPermissionsSuccess,
    loadPermissionsFailure,
    loadRolesRequest,
    loadRolesSuccess,
    loadRolesFailure,
    saveRoleRequest,
    saveRoleSuccess,
    saveRoleFailure,
    updateRoleRequest,
    updateRoleSuccess,
    updateRoleFailure,
    removeRoleRequest,
    removeRoleSuccess,
    removeRoleFailure,
} from './role-manager.actions';

const permissions = handleActions(
    {
        [loadPermissionsSuccess.toString()] : (_state,action) =>action.payload,
    },
    []
);

const roles = handleActions(
    {
        [loadRolesSuccess.toString()]   : (_state,action) => action.payload,
        [saveRoleSuccess.toString()]    : (state,action)  => [...state,action.payload],
        [updateRoleSuccess.toString()]  : (state,action)  => state.map(role=> {
            if (role.id === action.payload.id){
                return action.payload;
            }
            return role;
        }),
        [removeRoleSuccess.toString()] : (state,action)  => state.filter(role => role.name !== action.payload),
    },
    []
);

const isPermissionssLoading = handleActions(
    {
        [loadPermissionsRequest.toString()] : (_state,_action) => true,
        [loadPermissionsSuccess.toString()] : (_state,_action) => true,
        [loadPermissionsFailure.toString()] : (_state,_action) => true,
    },
    false
);

const isRolesLoading = handleActions(
    {
        [loadRolesRequest.toString()]   : (_state,_action) => true,
        [saveRoleRequest.toString()]    : (_state,_action) => true,
        [updateRoleRequest.toString()]  : (_state,_action) => true,
        [removeRoleRequest.toString()]  : (_state,_action) => true,
        [loadRolesSuccess.toString()]   : (_state,_action) => false,
        [saveRoleSuccess.toString()]    : (_state,_action) => false,
        [updateRoleSuccess.toString()]  : (_state,_action) => false,
        [removeRoleSuccess.toString()]  : (_state,_action) => false,
        [loadRolesFailure.toString()]   : (_state,_action) => false,
        [saveRoleFailure.toString()]    : (_state,_action) => false,
        [updateRoleFailure.toString()]  : (_state,_action) => false,
        [removeRoleFailure.toString()]  : (_state,_action) => false
    },
    false
);

const error = handleActions(
    {
        [loadPermissionsFailure.toString()] : (_state,action) => action.payload,
        [loadRolesFailure.toString()]       : (_state,action) => action.payload,
        [saveRoleFailure.toString()]        : (_state,action) => action.payload,
        [updateRoleFailure.toString()]      : (_state,action) => action.payload,
        [removeRoleFailure.toString()]      : (_state,action) => action.payload
    },
    null
);
export default combineReducers({
    permissions,
    roles,
    isPermissionssLoading,
    isRolesLoading,
    error
})