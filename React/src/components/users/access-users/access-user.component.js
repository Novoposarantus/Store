import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'

import AppTable from '../../table/table.component';
import './access-user.component.css';
import {
    getPermissions,
    getIsPermissionsLoading,
    getIsLogined
} from '../../../ducks/auth';
import {
    loadAccessDataRequest,
    getIsAccessUsersLoading,
    getData
} from '../../../ducks/access-users';


const mapStateToProps = state =>({
    accessData: getData(state),
    isLoading: getIsAccessUsersLoading(state),
    permissions: getPermissions(state),
    isPermissionsLoading: getIsPermissionsLoading(state),
    isLogined: getIsLogined(state)
})

const mapDispathToProps = {
    loadAccessDataRequest
}

class AccessUsersComponent  extends Component{
    static getDerivedStateFromProps(nextProps,nextState){
        if(nextProps.isLogined){
            let interval = setInterval(()=>{
                if(!nextProps.isPermissionsLoading){
                    if(!nextProps.permissions.includes('ShowAccessUsers')){
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
        const {loadAccessDataRequest} = this.props;
        loadAccessDataRequest();
    }
    render(){
        const {isPermissionsLoading, isLoading,accessData} = this.props;
        if(isPermissionsLoading || isLoading){
            return (
                <div>Загрузка</div>
            )
        }
        return (
            <div>
                {
                    <Fragment>
                        <AppTable
                            data={accessData}
                            remove={['id']}
                        />
                    </Fragment>
                }
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(AccessUsersComponent);

