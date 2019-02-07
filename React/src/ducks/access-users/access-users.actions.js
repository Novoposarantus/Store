import {createAction} from 'redux-actions';


export const loadAccessDataRequest  = createAction('ACEESS_USERS/LOAD_ACCESS_DATA_REQUEST');
export const loadAccessDataSuccess  = createAction('ACEESS_USERS/LOAD_ACCESS_DATA_SUCCESS');
export const loadAccessDataFailure  = createAction('ACEESS_USERS/LOAD_ACCESS_DATA_FAILURE');