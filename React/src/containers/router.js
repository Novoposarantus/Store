import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ProductComponent from '../components/products/productList';
import CreateProductComponent from '../components/products/create-product';
import LoginComponent from '../components/auth/login';
import RegistrationComponent from '../components/auth/register';
import AccessUsersComponent from '../components/users/access-users';
import RoleManagerComponent from '../components/users/role-manager';
import UserManagerComponent from '../components/users/user-manager';
import PageNotFound from '../components/errors/page-not-found';

export default ()=>{
    return (
        <Switch>
            <Route path='/' exact component={ProductComponent} />
            <Route path='/create-product' component={CreateProductComponent}/>
            <Route path='/login' component={LoginComponent}/>
            <Route path='/registration' component={RegistrationComponent}/>
            <Route path='/access-users' component={AccessUsersComponent}/>
            <Route path='/role-manager' component={RoleManagerComponent}/>
            <Route path='/user-manager' component={UserManagerComponent}/>
            <Route path='*' exact={true} component={PageNotFound} />
        </Switch>
    )
}