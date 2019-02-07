import React, { Component } from 'react';
import {connect} from 'react-redux'

import './page-not-found.component.css';
import {
} from '../../../ducks/auth';


const mapStateToProps = state =>({
})

const mapDispathToProps = {
}

class PageNotFoundComponent  extends Component{
    static getDerivedStateFromProps(nextProps,nextState){
    }
    state = {
    }
    render(){
        return (
            <div>
                page not found (404)
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(PageNotFoundComponent);

