import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CurrentDataPipe } from '../../pipes';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data : string[];
  @Input() button : string; 
  @Input() remove : string[];

  @Output() buttonClick = new EventEmitter<object>();

  filter = {};
  constructor() { }
  get viewTable(){
    return this.data.length > 0;
  }
  ngOnInit() {
    let currentData = new CurrentDataPipe().transform(this.data,this.remove);
    for(let key in currentData[0] ){
        this.filter[key] = (typeof(this.data[0][key]) == "boolean") ? false : '';
    }
  }
  jsUcfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getInputType(value){
    if (typeof(value) == "boolean") return 'checkbox'
    else return 'text';
  }
  getClass(value){
    if (typeof(value) == "boolean") return value ? "true" : "false"
    else return ""
  }
  onClick(e,item){
    e.target.disabled = true;
    setTimeout(()=>{
      e.target.disabled = false;
    },100)
    this.buttonClick.emit(this.getDefaultItem(item));
  }
  getDefaultItem(newItem){
    if (this.remove){
        for(let item of this.data){
            if (this.chekItem(item,newItem))
                return item;
        }
    }
    return newItem
  }
  chekItem(item,newItem){
      for (let key in newItem){
          if (item[key] !== newItem[key]){
              return false;
          }
      }
      return true;
  }
}