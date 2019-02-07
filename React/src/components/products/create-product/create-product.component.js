import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'

import './create-product.component.css';
import {
    saveProductRequest
} from '../../../ducks/products';
import {
    getPermissions,
    getIsPermissionsLoading,
    getIsLogined
} from '../../../ducks/auth';


const mapStateToProps = state =>({
    permissions: getPermissions(state),
    isPermissionsLoading: getIsPermissionsLoading(state),
    isLogined: getIsLogined(state)
})

const mapDispathToProps = {
    saveProductRequest
}

class CreateProductComponent  extends Component{
    static getDerivedStateFromProps(nextProps,nextState){
        if(nextProps.isLogined){
            let interval = setInterval(()=>{
                if(!nextProps.isPermissionsLoading){
                    if(!nextProps.permissions.includes('CreateProduct')){
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
    state={
        form:{
            name:'',
            category:'',
            price:0,
            exist:true,

        }
    }
    handleChange = (event) =>{
        const {name,type,value,checked} = event.target
        let currentValue;
        switch (type){
            case "text" :
                currentValue = value;
                break;
            case "number" :
                currentValue = value;
                break;
            case "checkbox":
                currentValue = checked;
                break;
            default:
                throw new Error("unsupported type");
        }
        this.setState(state=>({
            ...state,
            form:{
                ...state.form,
                [name]: currentValue
            }
        }))
    }
    submit = ()=>{
        let {form} = this.state;
        let {saveProductRequest} = this.props;
        saveProductRequest(form);
        this.setState(state=>({
            ...state,
            form:{
                name:'',
                category:'',
                price:0,
                exist:true,
            }
        }))
    }
    render(){
        const {isPermissionsLoading} = this.props;
        let {name,category,price,exist} = this.state.form;
        return (
            <div className="form-group">
                {
                    isPermissionsLoading
                    && <div>Загрузка</div>
                }
                {
                    !isPermissionsLoading
                    && <Fragment>
                    <label>Name</label>
                    <input
                        value={name}
                        onChange={this.handleChange}
                        type="text" 
                        name="name"
                        className="form-control"/>
                    <label>Category</label>
                    <input 
                        value={category}
                        onChange={this.handleChange}
                        type="text" 
                        name="category"
                        className="form-control"/>
                    <label>Price</label>
                    <input 
                        value={price}
                        onChange={this.handleChange}
                        type="number" 
                        name="price"
                        className="form-control"/>
                    <label>Exist in store</label>
                    <input 
                        checked={exist}
                        onChange={this.handleChange}
                        type="checkBox"
                        name="exist"
                        className="form-check"/>
                    <button 
                        className="btn btn-success"
                        onClick={this.submit}>
                        Submit</button>
                    </Fragment>
                }
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(CreateProductComponent);

