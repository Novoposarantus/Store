import Config from '../../config.js';
import {getCookie} from '../cookies';

export const roleManager = {
    namespaced: true,
    state:{
        allPermissions: [],
        allRoles: [],
    },
    getters:{
        allPermissions: (state)=>state.allPermissions,
        allRoles: (state)=>state.allRoles,
    },
    mutations:{
        pushPermissions(state, permission){
            state.allPermissions.push(permission);
        },
        pushRole(state,options){
            state.allRoles.push(options);
        },
        clearPermissons(state){
            state.allPermissions = [];
        },
        clearRoles(state){
            state.allRoles = [];
        }
    },
    actions:{
        loadPermissions(store){
            return new Promise((resolve,reject)=>{
                store.commit('clearPermissons');
                fetch(Config.getAllPermissions,{
                    headers: {
                        'Authorization': "Bearer " + getCookie('user-token')
                    }
                })
                .then(response => response.json())
                .then((myJson) => {
                    for (let permission of myJson){
                        store.commit('pushPermissions', permission);
                    }
                    resolve(myJson);
                })
                .catch((err)=>{
                    reject(err);
                })
            })
        },
        loadRoles(store){
            return new Promise((resolve,reject)=>{
                store.commit('clearRoles');
                fetch(Config.getAllRoles,{
                    headers: {
                        'Authorization': "Bearer " + getCookie('user-token')
                    }
                })
                .then(response => response.json())
                .then((myJson) => {
                    for (let role of myJson){
                        store.commit('pushRole', role);
                    }
                    resolve(myJson);
                })
                .catch((err)=>{
                    reject(err);
                })
            })
        },

        updateData(store){
                store.dispatch('loadPermissions');
                store.dispatch('loadRoles');
        },
        updateRole({commit,dispatch},role){
            return new Promise((resolve,reject)=>{
                fetch(Config.updateRole, {
                    method: 'POST',
                    body: JSON.stringify(role),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + getCookie('user-token')
                    }
                })
                .then(response => response.json())
                .then((myJson)=>{
                    dispatch('updateData');
                    resolve(myJson);
                })
                .catch(error=>{
                    reject(error);
                })
            })
        },
        saveRole({commit,dispatch},roleName){
            return new Promise((resolve,reject)=>{
                fetch(Config.saveRole, {
                    method: 'POST',
                    body: JSON.stringify({roleName}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + getCookie('user-token')
                    }
                })
                .then(response => response.json())
                .then((myJson)=>{
                    dispatch('updateData');
                    resolve(myJson);
                })
                .catch(error=>{
                    reject(error);
                })
            })
        },
        removeRole({commit,dispatch},roleName){
            return new Promise((resolve,reject)=>{
                fetch(Config.deleteRole, {
                    method: 'POST',
                    body: JSON.stringify({roleName}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + getCookie('user-token')
                    }
                })
                .then(response => response.json())
                .then((myJson)=>{
                    dispatch('updateData');
                    resolve(myJson);
                })
                .catch(error=>{
                    reject(error);
                })
            })
        }
    }
};