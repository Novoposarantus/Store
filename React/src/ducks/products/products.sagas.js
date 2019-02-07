import {
    loadProductsRequest, 
    loadProductsSuccess,
    loadProductsFailure,
    saveProductRequest, 
    saveProductSuccess,
    saveProductFailure,
    deleteProductsRequest, 
    deleteProductsSuccess,
    deleteProductsFailure,
} from './products.actions';

import {takeEvery,call, put} from 'redux-saga/effects'
import {getRequest, postRequest} from '../api';
import {Config} from '../../config';

function* loadProductsFlow(){
    try{
        const response = yield call(getRequest,Config.products);
        yield put(loadProductsSuccess(response))
    }catch (error){
        yield put(loadProductsFailure(error))
    }
}

function* saveProductFlow(action){
    try{
        const response = yield call(postRequest,Config.saveProduct, action.payload);
        yield put(saveProductSuccess(response))
    }catch (error){
        yield put(saveProductFailure(error))
    }
}

function* deleteProductsFlow(action){
    try{
        yield call(postRequest,Config.deleteProducts, action.payload);
        yield put(deleteProductsSuccess())
    }catch (error){
        yield put(deleteProductsFailure(error))
    }
}

export function* productsWatcher(){
    yield takeEvery(loadProductsRequest.toString(),loadProductsFlow)
    yield takeEvery(deleteProductsRequest.toString(),deleteProductsFlow)
    yield takeEvery(saveProductRequest.toString(),saveProductFlow)
}