import Config from '../../config.js';
import {getCookie} from '../cookies';

export const accessStore = {
    namespaced: true,
    state:{
        access: [],
    },
    getters:{
        access: state => state.access,
    },
    mutations:{
        push(state,data){
            state.access.push(data);
        },
        clear(state){
            state.access = [];
        }
    },
    actions:{
        updateData(store){
            return new Promise((resolve, reject) => {
                store.commit('clear');
                fetch(Config.accessData,{
                    headers: {
                        'Authorization': "Bearer " + getCookie('user-token')
                    }
                })
                .then(response => response.json())
                .then(data=>{
                    for(let user of data){
                        store.commit('push',user);
                    }
                    resolve(data);
                })
                .catch(err=>{
                    reject(err);
                })
            })
        }
    }
};