import React, { Component } from 'react';

import './table.component.css';
export default class TBody extends Component{
    constructor(props) {
        super(props);
        let key = null;
        for (let field in props.data[0]){
            let elementOfKeyList = [];
            for (let element of props.data){
                if(elementOfKeyList.includes(element)){
                    break;
                }
                elementOfKeyList.push(element[field])
            }
            if(!props.key && elementOfKeyList.length !== 0){
                key = field;
                break;
            }
        }
        this.state = {key}
    }
    _getClassName(element){
        if(typeof(element) == 'boolean'){
            return element.toString(); 
        }
        return '';
    }
    render(){
        let {data,remove,button,buttonClick} = this.props;
        let {key} = this.state;
        return(
            <tbody>
                {
                    data.map((element,index)=>(
                        <tr key={key ? element[key] : index}>
                            {
                                Object.keys(element)
                                .filter(key=>{
                                    return !(remove && remove.map(el=>el.toUpperCase()).includes(key.toUpperCase()))
                                }).map(key=>(
                                    <td key={key} className={this._getClassName(element[key])}>
                                        {element[key].toString()}
                                    </td>
                                ))
                            }
                            {
                                button && <td>
                                <button className="btn btn-success"
                                        onClick={()=>buttonClick(element)}>{button}</button>
                                </td>
                            }
                        </tr>
                    ))
                }
            </tbody>
        )
    }
}