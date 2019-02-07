import {
    loadPermissionsRequest,
    loadPermissionsSuccess,
    loadPermissionsFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
} from './auth.actions';

import {takeEvery,call, put} from 'redux-saga/effects'
import {getRequest, postRequest} from '../api';
import {Config} from '../../config';

function* loadPermissionsFlow(){
    try{
        const response = yield call(getRequest,Config.getPermissionsForUser);
        yield put(loadPermissionsSuccess(response))
    }catch (error){
        yield put(loadPermissionsFailure(error))
    }
}

function* loginFlow(action){
    try{
        const response = yield call(postRequest,Config.login,action.payload);
        yield put(loginSuccess(response))
    }catch (error){
        yield put(loginFailure(error))
    }
}

function* registerFlow(action){
    try{
        const response = yield call(postRequest,Config.registration,action.payload);
        yield put(registerSuccess(response))
    }catch (error){
        yield put(registerFailure(error))
    }
}

export function* authWatcher(){
    yield takeEvery(loadPermissionsRequest.toString(),loadPermissionsFlow);
    yield takeEvery(loginRequest.toString(),loginFlow);
    yield takeEvery(registerRequest.toString(),registerFlow);
}

export const authMiddleware = store => next => async action =>{
    switch(action.type){
        case loadPermissionsRequest.toString():{
            try{
                const response = await getRequest(Config.getPermissionsForUser);
                store.dispatch(loadPermissionsSuccess(response));
            }catch(error){
                store.dispatch(loadPermissionsFailure(error));
            }
            break;
        }
        case loginRequest.toString():{
            try{
                const response = await postRequest(Config.login,action.payload);
                store.dispatch(loginSuccess(response));
            }catch(error){
                store.dispatch(loginFailure(error));
            }
            break;
        }
        case registerRequest.toString():{
            try{
                const response = await postRequest(Config.registration,action.payload);
                store.dispatch(registerSuccess(response));
            }catch(error){
                store.dispatch(registerFailure(error));
            }
            break;
        }
        default:{
        }
    }
    next(action);
}