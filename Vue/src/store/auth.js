import Config from '../../config.js';
import {isCookie,setCookie,deleteCookie,getCookie} from '../cookies';




export const auth = {
    namespaced: true,
    state:{
        isAuthenticated: isCookie('user-token'),
        permissions: [],
        status: '',
    },
    getters:{
        isAuthenticated: (state) => {
            state.isAuthenticated = isCookie('user-token');
            return state.isAuthenticated;
        },
        authStatus: state => state.status,
        permissions: (state) => state.permissions,
    },
    mutations:{
        AUTH_SUCCESS: (state, permissions) => {
            state.permissions = permissions;
            state.isAuthenticated = true;
        },
        AUTH_ERROR: (state) => {
            state.isAuthenticated = false;
        },
        AUTH_LOGOUT: (state)=>{
            state.isAuthenticated = false;
        },
        SET_PERMISSION: (state,permissions)=>{
            state.permissions = permissions;
        },
        CLEAR_PERMISSIONS: (state)=>{
            state.permissions = [];
        }
    },
    actions:{
        login: ({commit, dispatch}, user)=>{
            return new Promise((resolve,reject)=>{
                fetch(Config.login, {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'}
                })
                .then(response => response.json())
                .then((myJson)=>{
                    commit('AUTH_SUCCESS', myJson.permissions);
                    setCookie('user-token', myJson.access_token, {expires: myJson.timeOut * 60});
                    resolve(myJson);
                })
                .catch(error=>{
                    commit('AUTH_ERROR', error);
                    commit('CLEAR_PERMISSIONS');
                    deleteAuthCookies();
                    reject(error);
                })
            })
        },
        logout: ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
              commit('AUTH_LOGOUT');
              commit('CLEAR_PERMISSIONS');
              deleteAuthCookies();
              resolve();
            })
        },
        register: (store,user)=>{
            return new Promise((resolve, reject) => {
                fetch(Config.registration,{
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {'Content-Type': 'application/json'}
                })
                .then(()=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        },
        getPermissions(state){
            return new Promise((resolve, reject) => {
                fetch(Config.getPermissionsForUser, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + getCookie('user-token')
                    }
                })
                .then(response => response.json())
                .then((myJson)=>{
                    state.commit('SET_PERMISSION', myJson.permissions);
                    resolve(myJson);
                })
                .catch(err=>{
                    reject(err);
                })
            })
        }
    }
};

function deleteAuthCookies(){
    deleteCookie('user-token');
    deleteCookie('userName');
}
