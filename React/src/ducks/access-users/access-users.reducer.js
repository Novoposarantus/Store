import {handleActions} from 'redux-actions';
import {combineReducers} from 'redux';

import {
    loadAccessDataRequest,
    loadAccessDataSuccess,
    loadAccessDataFailure
} from './access-users.actions';

const data = handleActions(
    {
        [loadAccessDataSuccess.toString()] : (_state,action) => action.payload
    },
    []
);

const isLoading = handleActions(
    {
        [loadAccessDataRequest.toString()] : (_state,_action) => true,
        [loadAccessDataSuccess.toString()] : (_state,_action) => false,
        [loadAccessDataFailure.toString()] : (_state,_action) => false
    },
    false
);

const error = handleActions(
    {
        [loadAccessDataFailure.toString()] : (_state,action) => action.payload
    },
    null
);

export default combineReducers({
    data,
    isLoading,
    error
})