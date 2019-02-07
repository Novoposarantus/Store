import {handleActions} from 'redux-actions';
import {combineReducers} from 'redux';

import {
    pushMain,
    removeMain,
    pushDeleted,
    removeDeleted,
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

const main = handleActions(
    {
        [pushMain.toString()]            : (state,action)  => [...state,action.payload],
        [removeMain.toString()]          : (state,action)  => state.filter(el=>el!==action.payload),
        [loadProductsSuccess.toString()] : (_state,action) => action.payload,
        [saveProductSuccess.toString()]  : (state,action)  => [...state,action.payload]
    },
    []
);
const deleted = handleActions(
    {
        [pushDeleted.toString()]           : (state,action)   => [...state,action.payload],
        [removeDeleted.toString()]         : (state,action)   => state.filter(el=>el!==action.payload),
        [loadProductsSuccess.toString()]   : (_state,_action) => [],
        [deleteProductsSuccess.toString()] : (_state,_action) => []
    },
    []
);

const isLoading = handleActions(
    {
        [loadProductsRequest.toString()]   : () => true,
        [loadProductsFailure.toString()]   : () => false,
        [loadProductsSuccess.toString()]   : () => false,
        [deleteProductsRequest.toString()] : () => true,
        [deleteProductsFailure.toString()] : () => false,
        [deleteProductsSuccess.toString()] : () => false,
        [saveProductRequest.toString()]    : () => true,
        [saveProductFailure.toString()]    : () => false,
        [saveProductSuccess.toString()]    : () => false,
    },
    false
);

const error = handleActions(
    {
        [loadProductsFailure.toString()]   : (_state,action) => action.payload,
        [saveProductFailure.toString()]    : (_state,action) => action.payload, 
        [deleteProductsFailure.toString()] : (_state,action) => action.payload 
    },
    null
);
export default combineReducers({
    main,
    deleted,
    isLoading,
    error
})