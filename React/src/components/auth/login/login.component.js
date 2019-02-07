import React, { Component } from 'react';
import {connect} from 'react-redux'

import './login.component.css';
import {
    loginRequest,
    getIsLogined,
    getIsLoginLoading,
    getIsLogout,
    getError
} from '../../../ducks/auth';


const mapStateToProps = state =>({
    isLogined: getIsLogined(state),
    isLogout: getIsLogout(state),
    isLoginLoading: getIsLoginLoading(state),
    error: getError(state)
})

const mapDispathToProps = {
    loginRequest
}

class LoginComponent  extends Component{
    static getDerivedStateFromProps(nextProps,nextState){
        if(nextProps.isLogined || nextProps.isLoginLoading) {
            nextProps.history.push('/');
        }
        return nextState;
    }
    state = {
        form: {
            login: '',
            password: ''
        }
    }
    handleChange = (event) => {
        const {name,value} = event.target;
        this.setState(state=>({
            ...state,
            form:{
                ...state.form,
                [name]:value
            }
        }))
    }
    submit=()=>{
        let {loginRequest, history} = this.props;
        let {form} = this.state;
        loginRequest(form);
        history.push('/');
    }
    render(){
        let {history} = this.props;
        let {login,password} = this.state.form;
        return (
            <div>
                <h2 className="text-center">Login in your account</h2>
                <div className="form-group">
                    <label>Login</label>
                    <input 
                        name="login"
                        value={login}
                        onChange={this.handleChange}
                        type="text" 
                        className="form-control"
                        />
                    <label>Password</label>
                    <input 
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        type="password" 
                        className="form-control"/>
                    <button 
                        onClick={this.submit}
                        className="btn btn-success btn-center">
                    Submit</button>
                </div>
                <button type="button" 
                        onClick={()=>{history.push('/registration')}}
                        className="btn btn-center">
                    Or create new Account
                </button>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(LoginComponent);

