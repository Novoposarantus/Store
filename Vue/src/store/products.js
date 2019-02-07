import Config from '../../config.js';
import {getCookie} from '../cookies';

import fetch from 'node-fetch';

export const products =  {
    namespaced: true,
    state:{
        mainData:[],
        deletedData: [],
        serverURL: Config.serverURL
    },
    getters:{
        mainData: (state) => state.mainData,
        deletedData: (state) => state.deletedData,
        serverURL: (state) => state.serverURL,
        serverWork(state){
            return (state.mainData.length === 0) 
                   && (state.deletedData.length === 0);
        }
    },
    mutations:{
        pushMain(state, data){
            state.mainData.push(data);
        },
        pushDeleted(state,data){
            state.deletedData.push(data);
        },
        removeMain(state,data){
            state.mainData.splice(state.mainData.indexOf(data),1);
        },
        removeDeleted(state,data){
            state.deletedData.splice(state.deletedData.indexOf(data),1);
        },
        clearMain(state){
            state.mainData = [];
        },
        clearDeleted(state){
            state.deletedData = [];
        },
        changeServer(state, data){
            state.serverURL = data;
        }
    },
    actions:{
        pushMain(store, data){
            store.commit('pushMain', data);
        },
        pushDeleted(store, data){
            store.commit('pushDeleted', data);
        },
        removeMain(store, data){
            store.commit('removeMain', data);
        },
        removeDeleted(store, data){
            store.commit('removeDeleted', data);
        },
        // changeServer(store, newserver){
        //     if (!(newserver === store.getters.serverURL)){
        //         store.commit('changeServer', newserver);
        //         store.dispatch('updateData');
        //     }
        // },
        updateData(store){
            return new Promise((resole,reject)=>{
                store.commit('clearMain');
                store.commit('clearDeleted');
                fetch(Config.server)
                .then(response => response.json())
                .then((myJson) => {
                    for (let product of myJson){
                        store.commit('pushMain', product);
                    }
                    resole(myJson);
                })
                .catch((err)=>{
                    reject(err);
                }) 
            })
        },
        saveProduct(store,data){
            return new Promise((resole,reject)=>{
                fetch(Config.createURL,{
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + getCookie('user-token')
                    }
                }).then(() => {
                    store.commit('pushMain',data);
                    resole();
                })
                .catch(error=>{
                    reject(error);
                })
            })
        },
        deleteProduct(store){
            let request = store.getters.deletedData.map(element=>element.id);
            return fetch(Config.deleteURL,{
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + getCookie('user-token')
                }
            }).then(() => {
                store.commit('clearDeleted');
            })
        }
    }
};