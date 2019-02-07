import Vue from 'vue';
import Vuex from 'vuex';

import {auth} from './auth';
import {products} from './products';
import {accessStore} from './accessData';
import {roleManager} from './roleManager';
import {usersManager} from './usersManager';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        modules:{
            auth,
            products,
            accessStore,
            roleManager,
            usersManager
        }
    });
}