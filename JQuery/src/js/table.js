import $ from 'jquery';

export class Table{

    constructor(
        place,
        options = {
            data,
            remove,
            button
        })
    {
        this._listEvents = {};
        this._$Data = [];
        this._currentKeys = [];
        this._props = {
            $place: $(place),
            $table: $('<table>',{ class: 'table table-bordered' }).appendTo(place),
            data: options.data ? options.data : [],
            remove: options.remove,
            button: options.button
        };
        this._render();
    }
    get dataLength(){
        return this._props.data.length;
    }
    get data(){
        return this._props.data;
    }
    addEventListener(nameEvent,eventHandler){
        if (!(this._listEvents[nameEvent])){
            this._listEvents[nameEvent] = [];
        }
        this._listEvents[nameEvent].push(eventHandler);
    }
    setData(setter){
        this._props.data = setter(this._props.data);
        this._render();
    }
    update(oldData,newdata){
        let {data} = this._props;
        for(let element of data){
            let check = true;
            for(let key in element){
                if(element[key] !== oldData[key]){
                    check = false;
                    break;
                }
            }
            if(check){
                this.remove(element);
                this.push(newdata);
                break;
            }
        }
    }
    push(element){
        let {data,$table} = this._props;
        data.push(element);
        if(data.length == 1 && $table.find('thead').length == 0){
            this._render();
        } else {
            this._rerenderDataPush(element);
        }
    }
    remove(element){
        let {data} = this._props;
        let indexElement = data.indexOf(element);
        data.splice(indexElement,1);
        this._rerenderDataRemove(indexElement);
    }
    show(){
        let {$table,$place} = this._props;
        $place.append($table);
    }
    hide(){
        let {$table} = this._props;
        $table.detach();
    }
    changeVisible(){
        let {$table} = this._props;
        if($table.parent().length > 0){
            this.hide();
        }else{
            this.show();
        }
    }
    clear(){
        let {data} = this._props;
        for(let element of data){
            this.remove(element);
        }
    }
    _setFilter(setter){
        this._filter = setter(this._filter);
        this._rerenderFilterData()
    }
    _render(){
        let {data} = this._props;
        if(data.length == 0){
            return;
        }
        this._dataAalysis(data);
        this._setDefaultValues();
        this._createThead();
        this._createTbody(data);
    }
    _setDefaultValues(){
        this._currentKeys = this._getCurrentKeys();
        this._filter = this._getDefaultFilter();
    }
    _createThead(){
        let {data,button,$table} = this._props;
        $table.find('thead').detach();
        const thead = $('<thead>').appendTo($table);
        let headers = $('<tr>').appendTo(thead);
        let filters = $('<tr>').appendTo(thead);
        for(let key of this._currentKeys){
            $('<td>').html(this._jsUcfirst(key)).appendTo(headers);
            let column = $('<td>').appendTo(filters);
            $('<input>', { type : this._getInputType(data[0][key])})
            .appendTo(column)
            .on(this._getInputType(data[0][key]) == 'checkbox' ? 'change' : 'input' ,(event)=>{
                this._setFilter(filter=>
                    $.extend(filter, { [key]: event.target.type == 'checkbox' ? event.target.checked : event.target.value }
                    ))
            });
        }
        if(button){
            $('<td>').appendTo(headers);
            $('<td>').appendTo(filters);
        }
    }
    _createTbody(data){
        let {$table} = this._props;
        $table.find('tbody').detach();
        $('<tbody>').appendTo($table);
        for (let element of data){
            this._rerenderDataPush(element);
        }
    }
    _rerenderFilterData(){
        let {data,$table} = this._props;
        //Получаем отфильтрованный массив данных
        let filteredData = data.filter(item=>{
            for(let key in this._filter){
                let check = typeof(data[0][key]) == "boolean"
                        ? ((this._filter[key] && item[key]) || !this._filter[key])
                        : (item[key].toString().toUpperCase().includes(this._filter[key].toString().toUpperCase()));
                if (!check) return false;
            }
            return true;
        })

        for(let [index,element] of data.entries()){
            if (!filteredData.includes(element)){
                this._$Data[index].detach();
                continue;
            }
            
            if(index == 0){
                $table.find('tbody').prepend(this._$Data[index]);
            }

            for(let i = index - 1 ; i >= 0 ; --i){
                if (this._$Data[i].parent().length !== 0){
                    this._$Data[i].after(this._$Data[index]);
                    break;
                }
            }
        }
    }
    _dataAalysis(data){
        let defautKeys = Object.keys(data[0]);
        for(let i = 1 ; i < data.length ; ++i){
            for(let [index,key] of Object.keys(data[i]).entries())
                if(defautKeys[index] !== key){
                    throw "Data not supported. Data is not of the same type"
                }
        }
    }
    _rerenderDataPush(element){
        let {$table, button} = this._props;
        //Создаем строку и вставляем ее в конец <tbody>
        let tableString = $('<tr>').appendTo($($table).find('tbody'));
        //Создаем столбцы и добавляем их к строке
        for(let key of this._currentKeys){
            $('<td>'+ element[key] +'</td>').appendTo(tableString);
        }
        //Если есть button добавляем к строке кнопку и создаем обработчик на click
        if(button){
            let box = $('<td>').appendTo(tableString);
            $('<button>',{type:'button', class:'btn btn-success'})
            .html(button)
            .click(()=>{
                if(this._listEvents['buttonClick'] && this._listEvents['buttonClick'].length > 0){
                    for(let fun of this._listEvents['buttonClick']){
                        fun(element);
                    }
                }
            }).appendTo(box);
        }
        this._$Data.push(tableString);
    }
    _rerenderDataRemove(index){
        this._$Data[index].remove();
        this._$Data.splice(index,1);
    }
    _getCurrentKeys(){
        let {data,remove} = this._props;
        if(this.remove){
            return  Object.keys(data[0]).filter(key=>{
                return !(remove && remove.map(el=>el.toUpperCase()).includes(key.toUpperCase()))
            })
        }
        return Object.keys(data[0]);
    }
    _getDefaultFilter(){
        let {data} = this._props;
        let filter = {};
        for(let key of this._currentKeys){
            filter[key] = (typeof(data[0][key]) == "boolean") ? false : '';
        }
        return filter;
    }
    _jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    _getInputType(value){
        if (typeof(value) == "boolean") return 'checkbox'
        else return 'text';
    }
}