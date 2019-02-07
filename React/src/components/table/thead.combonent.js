import React, { Component } from 'react';

import './table.component.css';
export default class THead extends Component{
    get headers(){
        let {data,remove} = this.props;
        return Object.keys(data)
        .filter(key=>{
            return !(remove && remove.map(el=>el.toUpperCase()).includes(key.toUpperCase()))
        }).map(key=>
            <td key={key}>{this.jsUcfirst(key)}</td>
        )

    }
    get filters(){
        let {data,remove,filter, handleInput} = this.props;
        return Object.keys(data)
        .filter(key=>{
            return !(remove && remove.map(el=>el.toUpperCase()).includes(key.toUpperCase()))
        })
        .map(key=>(
            <td key={key}>
                <input type={this.getInputType(data[key])}
                    name={key}
                    value={filter[key]}
                    onChange={handleInput}
                />
            </td> 
        ))
    }
    jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getInputType(value){
        if (typeof(value) == "boolean") return 'checkbox'
        else return 'text';
    }
    render(){
        let {button} = this.props;
        return(
            <thead>
                <tr>
                    {this.headers}
                    {button && <td/>}
                </tr>
                <tr>
                    {this.filters}
                    {button && <td/>}
                </tr>
            </thead>
        )
    }
}