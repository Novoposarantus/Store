import {takeEvery,call, put} from 'redux-saga/effects'

import {getRequest, postRequest} from '../api';
import {Config} from '../../config';

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

function* loadPermissionsFlow(){
    try{
        const response = yield call(getRequest,Config.getAllPermissions);
        yield put(loadPermissionsSuccess(response))
    }catch (error){
        yield put(loadPermissionsFailure(error))
    }
}

function* loadRolesFlow(){
    try{
        const response = yield call(getRequest,Config.getAllRoles);
        yield put(loadRolesSuccess(response))
    }catch (error){
        yield put(loadRolesFailure(error))
    }
}

function* saveRoleFlow(action){
    try{
        const response = yield call(postRequest,Config.saveRole,action.payload);
        yield put(saveRoleSuccess(response))
    }catch (error){
        yield put(saveRoleFailure(error))
    }
}

function* updateRoleFlow(action){
    try{
        yield call(postRequest,Config.updateRole,action.payload);
        yield put(updateRoleSuccess(action.payload))
    }catch (error){
        yield put(updateRoleFailure(error))
    }
}

function* removeRoleFlow(action){
    try{
        yield call(postRequest,Config.deleteRole,action.payload);
        yield put(removeRoleSuccess(action.payload))
    }catch (error){
        yield put(removeRoleFailure(error))
    }
}

export function* roleManagerWatcher(){
    yield takeEvery(loadPermissionsRequest.toString(),loadPermissionsFlow);
    yield takeEvery(loadRolesRequest.toString(),loadRolesFlow);
    yield takeEvery(saveRoleRequest.toString(),saveRoleFlow);
    yield takeEvery(updateRoleRequest.toString(),updateRoleFlow);
    yield takeEvery(removeRoleRequest.toString(),removeRoleFlow);
}