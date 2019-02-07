import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'

import './role-manager.component.css';
import {
    getPermissions,
    getIsPermissionsLoading,
    getIsLogined
} from '../../../ducks/auth';
import {
    loadPermissionsRequest,
    loadRolesRequest,
    updateRoleRequest,
    saveRoleRequest,
    removeRoleRequest,
    getPermissionsOfRole,
    getRoles,
    getIsRoleManagerLoading
} from '../../../ducks/role-manager';


const mapStateToProps = state =>({
    permissionsOfRole: getPermissionsOfRole(state),
    roles: getRoles(state),
    isLoading: getIsRoleManagerLoading(state),
    permissions: getPermissions(state),
    isPermissionsLoading: getIsPermissionsLoading(state),
    isLogined: getIsLogined(state)
})

const mapDispathToProps = {
    loadPermissionsRequest,
    loadRolesRequest,
    updateRoleRequest,
    saveRoleRequest,
    removeRoleRequest
}

class RoleManagerComponent  extends Component{
    static getDerivedStateFromProps(nextProps,nextState){
        if(nextProps.isLogined){
            let interval = setInterval(()=>{
                if(!nextProps.isPermissionsLoading){
                    if(!nextProps.permissions.includes('AccessToRoleManager')){
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
    componentDidMount(){
        const {loadPermissionsRequest, loadRolesRequest} = this.props;
        loadPermissionsRequest();
        loadRolesRequest();
    }
    render(){
        const {isPermissionsLoading, isLoading} = this.props;
        if (isPermissionsLoading || isLoading)
        return (
            <div>Загрузка</div>
        )
        return (
            <div>
                <Fragment>
                    <div>RoleManagerComponent</div>
                </Fragment>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(RoleManagerComponent);

