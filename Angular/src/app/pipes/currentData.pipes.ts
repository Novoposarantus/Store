import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'currentData'})
export class CurrentDataPipe implements PipeTransform {
  transform(data, remove : string[]) : any {
    if (remove){
        let newdata = [];
        for(let item of data){
            let newItem = {};
            for(let key in item){
                if(!remove.includes(key.toUpperCase())){
                    newItem[key] = item[key];
                }
            }
            newdata.push(newItem);
        }
        return newdata;
    }
    return data;
  }
}