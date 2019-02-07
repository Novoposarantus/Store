import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filterItems',
  pure: false
})
export class FilterItemsPipe implements PipeTransform {
  transform(array, filter) : any {
    return array.filter((item) => {
        for(let key in filter){
            let check = typeof(array[0][key]) == "boolean"
                        ? ((filter[key] && item[key]) || !filter[key])
                        : (item[key].toString().toUpperCase().indexOf(filter[key].toString().toUpperCase()) !== -1)
            if (!check) return false;
        }
        return true;
    });
  }
}