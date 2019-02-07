import Config from '../../config.js';
import {getCookie} from '../cookies';

export const usersManager = {
    namespaced: true,
    state:{
        allUsers: []
    },
    getters:{
        allUsers: (state)=>state.allUsers,
    },
    mutations:{
        pushUser(state, user){
            state.allUsers.push(user);
        },
        clearUsers(state){
            state.allUsers = [];
        },
    },
    actions:{
        loadUsers(store){
            return new Promise((resolve,reject)=>{
                store.commit('clearUsers');
                fetch(Config.getAllUsers,{
                    headers: {
                        'Authorization': "Bearer " + getCookie('user-token')
                    }
                })
                .then(response => response.json())
                .then((myJson) => {
                    for (let user of myJson){
                        store.commit('pushUser', user);
                    }
                    resolve(myJson);
                })
                .catch((err)=>{
                    reject(err);
                })
            })
        },
        
        updateUser({commit,dispatch},user){
            return new Promise((resolve,reject)=>{
                fetch(Config.updateUser, {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + getCookie('user-token')
                    }
                })
                .then(response => response.json())
                .then((myJson)=>{
                    dispatch('loadUsers');
                    resolve(myJson);
                })
                .catch(error=>{
                    reject(error);
                })
            })
        },
    }
};