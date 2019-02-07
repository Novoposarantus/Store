import {createAction} from 'redux-actions';

export const pushMain              = createAction('PPRODUCTS/PUSH_MAIN');
export const removeMain            = createAction('PPRODUCTS/REMOVE_MAIN');
export const pushDeleted           = createAction('PPRODUCTS/PUSH_DELETED');
export const removeDeleted         = createAction('PPRODUCTS/REMOVE_DELETED');
export const loadProductsRequest   = createAction('PPRODUCTS/LOAD_PRODUCTS_REQUEST');
export const loadProductsSuccess   = createAction('PPRODUCTS/LOAD_PRODUCTS_SUCCESS');
export const loadProductsFailure   = createAction('PPRODUCTS/LOAD_PRODUCTS_FAILURE');
export const saveProductRequest    = createAction('PPRODUCTS/SAVE_PRODUCTS_REQUEST');
export const saveProductSuccess    = createAction('PPRODUCTS/SAVE_PRODUCTS_SUCCESS');
export const saveProductFailure    = createAction('PPRODUCTS/SAVE_PRODUCTS_FAILURE');
export const deleteProductsRequest  = createAction('PPRODUCTS/DELETE_PRODUCTS_REQUEST');
export const deleteProductsSuccess  = createAction('PPRODUCTS/DELETE_PRODUCTS_SUCCESS');
export const deleteProductsFailure  = createAction('PPRODUCTS/DELETE_PRODUCTS_FAILURE');