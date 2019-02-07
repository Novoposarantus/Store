import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'

import './App.css';
import router from  './router';

import {
  loadPermissionsRequest,
  getPermissions,
  getIsLogined,
  getIsLogout,
  getIsLoginLoading,
  logout
 } from '../ducks/auth';

const mapStateToProps = state =>({
  permissions: getPermissions(state),
  isLogined: getIsLogined(state),
  isLogout: getIsLogout(state),
  IsLoginLoading: getIsLoginLoading(state)
})

const mapDispathToProps = {
  logout,
  loadPermissionsRequest
}

class App extends Component {
  constructor(props){
    if(props.isLogined){
      props.loadPermissionsRequest();
    }
    super(props);
  }
  render() {
    let {
      permissions,
      isLogined,
      isLogout,
      IsLoginLoading,
      logout} = this.props;
    return (
      <div className="App">
       <header>
          <h1>Welcome</h1>
        </header>
        <main>
          <nav>
            <ul>
              {
                ( isLogined && permissions.includes("CreateProduct")) 
                && <li className="list-group-item">
                    <NavLink to="/create-product">Create Product</NavLink>
                  </li>
              }
              <li className="list-group-item">
                <NavLink to="/">Table</NavLink>
              </li>
              {
                isLogout 
                && <li className="list-group-item">
                    <NavLink to="/login">Login</NavLink>
                   </li>
              }
              {
                IsLoginLoading
                && <li className="list-group-item">
                      <span>Загрузка</span>
                   </li>
              }
              {
                isLogined
                && <li className="list-group-item">
                      <span onClick={()=>{logout()}}>Logout</span>
                   </li>
              }
              {
                ( isLogined && permissions.includes("ShowAccessUsers")) 
                && <li className="list-group-item">
                    <NavLink to="/access-users">Access Users</NavLink>
                  </li>
              }
              {
                ( isLogined && permissions.includes("AccessToRoleManager")) 
                && <li className="list-group-item">
                    <NavLink to="/role-manager">Role Manger</NavLink>
                  </li>
              }
              {
                ( isLogined && permissions.includes("AccessToUserManager")) 
                && <li className="list-group-item">
                    <NavLink to="/user-manager">User Manger</NavLink>
                  </li>
              }
            </ul>
          </nav>
          <div className="content">
            {router()}
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispathToProps
)(App));

