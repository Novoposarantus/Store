import {
    loginSuccess,
    logout
} from './auth.actions';

export const checkTokenMiddleware = _store=>next=>action=>{
    switch(action.type){
        case loginSuccess.toString():{
            localStorage.setItem('user-token',action.payload.access_token);
            break;
        }
        case logout.toString():{
            localStorage.removeItem('user-token');
            break;
        }
        default:{
            break;
        }
    }
    next(action);
}