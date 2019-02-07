import {combineReducers} from 'redux';
import products from '../ducks/products';
import auth from '../ducks/auth';
import accessUsers from '../ducks/access-users';
import roleManager from '../ducks/role-manager';
import userManager from '../ducks/user-manager';
export default combineReducers({
    products,
    auth,
    accessUsers,
    roleManager,
    userManager
})