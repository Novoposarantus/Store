import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import { RequestService, TypeRequest} from "./request.service";
import {Product} from '../models/product.model';
import Config from '../../../config';

@Injectable()
export class ProductService {

    constructor(private http: RequestService) {}

    private mainData : Product[] = [];
    private deletedData : Product[] = [];

    getMainData() : Product[]{
        return this.mainData;
    }
    getDeletedData(): Product[]{
        return this.deletedData;
    }
    pushMain(element){
        this.mainData = this.mainData.concat(element);
    }
    pushDeleted(element){
        this.deletedData = this.deletedData.concat(element);
    }
    removeMain(element = null){
        if (element){
            this.mainData = this.mainData.filter((el)=> el != element);
        }else{
            this.mainData = [];
        }
    }
    removeDeleted(element = null){
        if (element){
            this.deletedData = this.deletedData.filter((el)=> el != element);
        }else{
            this.deletedData = [];
        }
    }
    updateProducts():Observable<Product[]>{
        this.clearData();
        let request = this.loadProductsList();
        request.subscribe(products=>{
            this.mainData = products;
        });
        return request;
    }
    saveProduct(product: Product):Observable<any>{
        let request = this.sendNewProduct(product);
        request.subscribe((product:Product)=>{
            this.pushMain(product);
        });
        return request;
    }
    deleteProducts():Observable<any>{
        let products = [];
        for (let item of this.getDeletedData()){
            products.push(item.id);
        }
        let request = this.sendDeletedProducts(products);
        request.subscribe(()=>{
            this.deletedData = [];
        });
        return request;
    }
    private loadProductsList():Observable<Product[]>{
        return this.http.send(Config.products,TypeRequest.Get);
    }
    private sendNewProduct(product:Product):Observable<any>{
        return this.http.send(Config.saveProduct,TypeRequest.Post,product);
    }
    private sendDeletedProducts(products:number[]):Observable<any>{
        return this.http.send(Config.deleteProducts,TypeRequest.Post,products);
    }
    private clearData(){
        this.mainData = [];
        this.deletedData = [];
    }
}