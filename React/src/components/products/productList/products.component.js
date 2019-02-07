import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'

import './products.component.css';
import AppTable from '../../table/table.component';
import {
    loadProductsRequest,
    deleteProductsRequest,
    pushDeleted,
    pushMain,
    removeDeleted,
    removeMain,
    getMainData,
    getDeltedData,
    getIsProductsLoading,
    getError
} from '../../../ducks/products';

import {
    getPermissions,
    getIsLogined,
    getIsPermissionsLoading
}from '../../../ducks/auth';

const mapStateToProps = state =>({
    mainData: getMainData(state),
    deletedData: getDeltedData(state),
    isRequestig: getIsProductsLoading(state),
    isPermissionsLoading: getIsPermissionsLoading(state),
    error: getError(state),
    permissions: getPermissions(state),
    isLogined : getIsLogined(state)
})

const mapDispathToProps = {
    loadProductsRequest,
    deleteProductsRequest,
    pushDeleted,
    pushMain,
    removeDeleted,
    removeMain,
}

class ProductComponent  extends Component{
    state={
        enableDeletedTable: false,
        showSource: false
    }
    
    get errorView() {
        const {error} = this.props;
        return(
            <div>
                <h2>Что-то пошло не так</h2>
                <p>{error.toString()}</p>
            </div>
        )
    }
    get loadingView(){
        return(
            <div>Загрузка</div>
        )
    }
    get showDeleteTableView() {
        const {deletedData} = this.props;
        return (
            deletedData.length > 0 
            && <button 
                    className="btn header btn-margin"
                    onClick={this.showDeleteTableClick}>
                    Show delete table
                </button>
        )
    }
    get showSourceButtonView() {
        const {permissions} = this.props;
        return (
            permissions.includes('ShowProductSource')
            && <button 
                    className="btn header btn-margin"
                    onClick={this.showSourceButtonClick}>
                    Show source
                </button>
        )
    }
    get deleteAllView(){
        const {isLogined,permissions,deletedData} = this.props;
        return(
            (isLogined && permissions.includes('DeleteProducts') && deletedData.length > 0 )
            && <button 
                    className="btn header btn-margin"
                    onClick={this.deleteAll}>
                    Delete all
                </button>
        )
    }
    get mainDataView(){
        const {mainData, permissions} = this.props;

        return(
            mainData.length > 0 
            && <AppTable
                button="delete"
                remove={permissions.includes('ShowProductSource') ? ['id']: ['id','source']}
                buttonClick={this.mainButtonClick.bind(this)}
                data={mainData}/>
        )
    }
    get deletedDataView(){
        const {deletedData, permissions} = this.props;
        const {enableDeletedTable} = this.state;

        return(
            (deletedData.length > 0 && enableDeletedTable) 
            && <AppTable
                button="restore"
                remove={permissions.includes('ShowProductSource') ? ['id']: ['id','source']}
                buttonClick={this.deletedButtonClick.bind(this)}
                data={deletedData}/>
        )
    }

    componentDidMount(){
        let {loadProductsRequest} = this.props;
        loadProductsRequest();
    }
    
    mainButtonClick = (element) => {
        let {removeMain,pushDeleted} = this.props;
        removeMain(element);
        pushDeleted(element);
    }
    deletedButtonClick = (element) => {
        let {removeDeleted,pushMain} = this.props;
        removeDeleted(element);
        pushMain(element);
    }
    showDeleteTableClick = () => {
        this.setState((state)=>({
            ...state,
            enableDeletedTable : !state.enableDeletedTable
        }))
    }
    showSourceButtonClick = () => {
        this.setState(state=>({
            ...state,
            showSource: !state.showSource
        }))
    }
    deleteAll = () => {
        let {deleteProductsRequest,deletedData} = this.props;
        deleteProductsRequest(deletedData.map(el=>el.id));
    }

    render(){
        const {isRequestig,error} = this.props;
        if(isRequestig){
            return (
                <Fragment>
                    {this.loadingView}
                </Fragment>
            )
        }
        if(error){
            return (
                <Fragment>
                    {this.errorView}
                </Fragment>
            )
        }
        return (
            <div>
                <div className="main">
                    {this.showDeleteTableView}
                    {this.deleteAllView}
                </div>
                <div className="main">
                    {this.mainDataView}
                    {this.deletedDataView}
                </div>
            </div>
            
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(ProductComponent);

