import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'

import './user-manager.component.css';
import {
    getPermissions,
    getIsPermissionsLoading,
    getIsLogined
} from '../../../ducks/auth';
import {
    loadUsersListRequest,
    updateUserRequest,
    getIsUsersListLoading,
    getUsersList
} from '../../../ducks/user-manager';


const mapStateToProps = state =>({
    userList: getUsersList(state),
    isLoading: getIsUsersListLoading(state),
    permissions: getPermissions(state),
    isPermissionsLoading: getIsPermissionsLoading(state),
    isLogined: getIsLogined(state)
})

const mapDispathToProps = {
    loadUsersListRequest,
    updateUserRequest
}

class UserManagerComponent  extends Component{
    static getDerivedStateFromProps(nextProps,nextState){
        if(nextProps.isLogined){
            let interval = setInterval(()=>{
                if(!nextProps.isPermissionsLoading){
                    if(!nextProps.permissions.includes('AccessToUserManager')){
                        nextProps.history.push('/');
                    }
                    clearInterval(interval);
                }
            },100)
        }else{
            nextProps.history.push('/');
        }
        return {
            ...nextState,
        }
    }
    state = {
        
    }
    render(){
        const {isPermissionsLoading} = this.props;
        return (
            <div>
                {
                    isPermissionsLoading
                    && <div>Загрузка</div>
                }
                {
                    !isPermissionsLoading
                    && <Fragment>
                        <div>UserManagerComponent</div>
                    </Fragment>
                }
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(UserManagerComponent);

