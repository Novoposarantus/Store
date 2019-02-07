import {takeEvery,call, put} from 'redux-saga/effects'

import {getRequest} from '../api';
import {Config} from '../../config';

import {
    loadAccessDataRequest,
    loadAccessDataSuccess,
    loadAccessDataFailure
} from './access-users.actions';


function* loadAccessDataFlow(){
    try{
        const response = yield call(getRequest,Config.accessData);
        yield put(loadAccessDataSuccess(response))
    }catch (error){
        yield put(loadAccessDataFailure(error))
    }
}

export function* accessUsersWatcher(){
    yield takeEvery(loadAccessDataRequest.toString(),loadAccessDataFlow)
}