import $ from 'jquery';
import {postRequest} from '../../request';
import './createProduct.css';
import {Config} from '../../../../config';

export function renderCreateProduct(){
    let $place = $(
        `
        <form class="form-group"">
            <label>Name</label>
            <input type="text" name="name" class="form-control"">
            <label>Category</label>
            <input type="text" name="category" class="form-control"">
            <label>Price</label>
            <input type="number" name="price" value="0" class="form-control">
            <label>Exist in store</label>
            <input type="checkBox" name="exist" class="form-check">
            <button type="button" class="btn btn-success">Submit</button>
        </form>
        `
    )
    

    let form= {
        name:'',
        category:'',
        price:0,
        exist:false
    }

    $place.find('input')
        .on('change',(event)=>{
            let $target = $(event.target);
            form[$target.attr('name')] = ($target.attr('type') == 'text' || $target.attr('type') == 'number')
                                                        ? $target.val()
                                                        : $target.prop('checked');
        })
    $place.find('button').click(()=>{
        postRequest(Config.saveProduct,form,true);
    })
    return $place;
}