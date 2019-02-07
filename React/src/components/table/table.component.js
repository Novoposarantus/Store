import React, { Component } from 'react';
import TBody from './tbody.component';
import THead from './thead.combonent';
import './table.component.css';

export default class AppTable extends Component{
    static getDerivedStateFromProps(nextProps,nextState){
        let {data,remove} = nextProps;
        if(data.length > 0){
            let filter = {};
            let removedElement = Object.keys(data[0])
                                    .filter(key=>{
                                        return !(remove && remove.map(el=>el.toUpperCase()).includes(key.toUpperCase()))
                                    })
            for(let key of removedElement){
                filter[key] = (typeof(data[0][key]) == "boolean") ? false : '';
            }
            
            if(nextState && nextState.filter){
                for(let key in filter){
                    if(nextState.filter[key]){
                        filter[key] = nextState.filter[key];
                    }
                }
            }

            return {
                ...nextState,
                filter
            }
        }else{
            return{
                ...nextState
            }
        }
    }
    filterItems(name,value){
        let filter = {
            ...this.state.filter,
            [name]:value
        }
        this.setState((state)=>({
            ...state,
            filter
        })) 
    }
    handleInput = (event) => {
        const {name,type,value,checked} = event.target
        let currentValue;
        switch (type){
            case "text" :
            currentValue = value;
                break;
            case "checkbox":
            currentValue = checked;
                break;
            default:
                throw new Error("unsupported type");
        }
        this.setState((state)=>({
            ...state,
            filter: {
                ...state.filter,
                [name]:currentValue
            }
        }))
    }
    get filterData(){
        let {data} = this.props;
        let {filter} = this.state;

        return data.filter((item) => {
            for(let key in filter){
                let check = typeof(data[0][key]) == "boolean"
                        ? ((filter[key] && item[key]) || !filter[key])
                        : (item[key].toString().toUpperCase().indexOf(filter[key].toString().toUpperCase()) !== -1);
                if (!check) return false;
            }
            return true;
        })
    }
    render(){
        let {data,remove,button,buttonClick}  = this.props;
        let {filter} = this.state;
        return (
            <div>
                {this.filter}
                <table className="table table-bordered">
                    <THead
                        data={data.length > 0 ? data[0] : null}
                        filter={filter}
                        remove={remove}
                        button={button}
                        handleInput={this.handleInput.bind(this)}
                        />
                    <TBody 
                        data={this.filterData}
                        button={button}
                        buttonClick={buttonClick}
                        remove={remove}/>
                </table>
            </div>
        );
    }
}