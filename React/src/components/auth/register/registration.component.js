import React, { Component } from 'react';
import {connect} from 'react-redux'

import './registration.component.css';
import {
    registerRequest,
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
    registerRequest
}

class RegistrationComponent  extends Component{
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
        let form = {
            ...this.state.form,
            [name]:value
        }
        this.setState(state=>({
            ...state,
            form
        }))
    }
    submit=()=>{
        let {registerRequest, history} = this.props;
        let {form} = this.state;
        registerRequest(form);
        history.push('/login');
    }
    render(){
        let {login,password} = this.state;
        return (
            <div>
                <h2 className="text-center">Register new account</h2>
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
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(RegistrationComponent);

