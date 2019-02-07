import { fork } from 'redux-saga/effects'

import {
    productsWatcher
} from '../ducks/products';

import {
    authWatcher
} from '../ducks/auth';

import {
    accessUsersWatcher
} from '../ducks/access-users';

import{
    roleManagerWatcher
} from '../ducks/role-manager';

import{
    userManagerWatcher
} from '../ducks/user-manager';

export default function*(){
    yield fork(productsWatcher);
    yield fork(authWatcher);
    yield fork(accessUsersWatcher);
    yield fork(roleManagerWatcher);
    yield fork(userManagerWatcher);
}