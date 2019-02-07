import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Products from './components/List/Products';
import CreateProduct from './components/CreateProduct';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout'; 
import AccessUsers from './components/Access';
import RolesManager from './components/Menu/MenuRoles';
import UsersManager from './components/Menu/MenuUsers';
import NotEnoughPermission from './components/NotEnoughPermission';

const ifNotAuthenticated = ( next, store) => {
    if (!store.getters['auth/isAuthenticated']) {
        next()
        return
    }
    next('/')
}
  
const ifAuthenticated = (next,store ) => {
    if (store.getters['auth/isAuthenticated']) {
        next()
        return
    }
    next('/login')
}

function CheckPermissions(next, store, permission,dispatch = null) {
    //Если массив Permission не успел загрузиться, то ничего не произойдет
    //Каждые 100мс будет проверяться загрузился ли массив
    //И после его загрузки проверяется наличие разрешения
    
    if (store.getters['auth/isAuthenticated']){
        let interval = setInterval(()=>{
            if (store.getters['auth/permissions'].length > 0){
                clearInterval(interval);
                    if (store.getters['auth/permissions'].includes(permission)){
                        if (dispatch) dispatch();
                        next();
                        return
                    }
                    next('NotEnoughPermission');
                    return
                }
        },100);
    }
    else {
        next('/Login');
    }
}


// export const router = new VueRouter({
//     routes,
//     mode: 'history',
// })
export function createRouter (store) {
    return new VueRouter({
        mode: 'history',
        routes : [
            {
                path: '/Products',
                component: Products
            },
            {
                path: '/',
                component: Products
            },
            {
                path: '/Create',
                component : CreateProduct,
                beforeEnter: (to, from, next) => {
                    CheckPermissions(next,store,'CreateProduct');
                }
            },
            {
                path: '/login',
                component :  Login,
                beforeEnter: (to, from, next) => {
                    ifNotAuthenticated(next,store);
                }
            },
            {
                path: '/Registration',
                component: Register,
                beforeEnter: (to, from, next) => {
                    ifNotAuthenticated(next,store);
                }
            },
            {
                path: '/Logout',
                component: Logout,
                beforeEnter: (to, from, next) => {
                    ifAuthenticated(next,store);
                }
            },
            {
                path: '/AccessedUsers',
                component: AccessUsers,
                beforeEnter: (to, from, next) => {
                    CheckPermissions(next,store,'ShowAccessUsers',()=>{
                        store.dispatch('accessStore/updateData');
                    });
                }
            },
            {
                path: '/RolesManager',
                component: RolesManager,
                beforeEnter: (to,from,next)=>{
                    CheckPermissions(next,store,'AccessToRoleManager',()=>{
                        store.dispatch('roleManager/updateData');
                    });
                }
            },
            {
                path: '/UsersManager',
                component: UsersManager,
                beforeEnter: (to,from,next)=>{
                    CheckPermissions(next,store,'AccessToUserManager',()=>{
                        store.dispatch('usersManager/loadUsers');
                    });
                }
            },
            {
                path: '/NotEnoughPermission',
                component: NotEnoughPermission,
                beforeEnter: (to, from, next) => {
                    ifAuthenticated(next,store);
                }
            }
        ]
    });
}