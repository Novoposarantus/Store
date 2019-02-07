import $ from 'jquery';
import './index.css';
import {
    renderProducts,
    renderCreateProduct,
    renderLogin,
    renderRoleMenu,
    renderUserMenu
} from './js/pages';
import {getRequest} from './js/request';
import {Config} from '../config';

import './js/Plugins/table.plugin';

"use strict";

let table = $('#mainNav').table({
    data: [{id:1,name:'name1'},{id:2,name:'name2'}]
});

table.table('hide');

// $(document).ready( async function() {
//     let permissions = [];
//     let allLi = [];
//     let now = 'products';

//     if(localStorage.getItem('user-token') !== null){
//         try{
//             permissions = await getRequest(Config.getPermissionsForUser,true);
//         }catch(e){
//             permissions = [];
//             localStorage.removeItem('user-token');
//         }
//     }
    
//     $('#mainNav ul li').each((_index,element)=>{
//         allLi.push($(element));
//     })

//     rerenderNav(allLi,permissions);
//     renderOn['products']($('#content'),permissions);

//     allLi.forEach(element=>element.click(event=>{
//         let page = event.target.getAttribute('key');
//         if (page !== now){
//             switch(page){
//                 case 'login':{
//                     $('#content *').remove();
//                     renderLogin($('#content'), (permissions)=>{
//                         rerenderNav(allLi,permissions);
//                         renderOn['products']($('#content'),permissions);
//                         now = 'products';
//                     });
//                     break;
//                 }
//                 case 'logout':{
//                     permissions = [];
//                     localStorage.removeItem('user-token');
//                     rerenderNav(allLi,permissions);
//                     renderOn['products']($('#content'),permissions);
//                     now = 'products';
//                     break;
//                 }
//                 default:{
//                     renderOn[page]($('#content'),permissions);
//                     break;
//                 }
//             }
//             now = page;
//         }
//     }))
// });

// const renderOn = {
//     products : async ($content,permissions)=>{
//         $content.empty().append(await renderProducts(permissions));
//     },
//     CreateProduct : async ($content)=>{
//         $content.empty().append(await renderCreateProduct())
//     },
//     AccessToRoleManager : async ($content)=>{
//         $content.empty().append(await renderRoleMenu())
//     },
//     AccessToUserManager : async ($content)=>{
//         $content.empty().append(await renderUserMenu());
//     },
// }

// function rerenderNav(allLi,permissions = []){
//     let isAuth = localStorage.getItem('user-token') !== null;
//     return allLi.filter($element=>{
//         switch($element.attr('key')){
//             case 'CreateProduct':
//             case 'AccessToRoleManager':
//             case 'AccessToUserManager':
//                 if(!permissions.includes($element.attr('key'))){
//                     $element.detach();
//                     break;
//                 }
//                 let arr = allLi.filter(element=>element.parent().length > 0);
//                 arr[arr.length-1].after($element);
//                 break;
//             case 'login':
//                 if(isAuth){
//                     $element.html('Logout');
//                     $element.attr('key','logout');
//                 }
//                 break;
//             case 'logout':
//                 if(!isAuth){
//                     $element.html('Login');
//                     $element.attr('key','login');
//                 }
//                 break;
//         }
        
//     });
// }