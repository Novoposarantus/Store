import {takeEvery,call, put} from 'redux-saga/effects'

import {getRequest, postRequest} from '../api';
import {Config} from '../../config';

import {
    loadUsersListRequest,
    loadUsersListSuccess,
    loadUsersListFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure
} from './user-manager.actions';

function* loadUsersFlow(){
    try{
        const response = yield call(getRequest,Config.getAllPermissions);
        yield put(loadUsersListSuccess(response))
    }catch (error){
        yield put(loadUsersListFailure(error))
    }
}

function* updateUserFlow(action){
    try{
        yield call(postRequest,Config.getAllPermissions,action.payload);
        yield put(updateUserSuccess(action.payload))
    }catch (error){
        yield put(updateUserFailure(error))
    }
}

export function* userManagerWatcher(){
    yield takeEvery(loadUsersListRequest.toString(),loadUsersFlow);
    yield takeEvery(updateUserRequest.toString(),updateUserFlow);
}
