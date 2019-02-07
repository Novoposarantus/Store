import { Component, OnInit } from '@angular/core';

import { Product } from  '../../../../models';
import {ProductService, AuthService, OnInitService} from '../../../../servises';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  constructor(private productService: ProductService,
              private authService: AuthService,
              private onInitService: OnInitService) { }

  showDelete = false;
  showSource = false;
  
  get mainData():Product[]{
    return this.productService.getMainData();
  }
  get deletedData():Product[]{
    return this.productService.getDeletedData();
  }
  get showSourceButton(): boolean{
    return this.authService.checkPermission('ShowProductSource');
  }
  get showDeleteButton(): boolean{
    return this.authService.checkPermission('DeleteProducts');
  }
  ngOnInit() {
    if (this.productService.getMainData().length == 0){
      this.onInitService.status = true;
      this.productService.updateProducts().subscribe(()=>{
        this.onInitService.status = false;
      })
    }
  }
  clickSourceButton(){
    this.showSource = !this.showSource;
  }
  clickDeleteAllButton(){
    this.productService.deleteProducts();
  }
  mainButtonClick(item) {
    if(item instanceof MouseEvent) return;
    this.productService.pushDeleted(item);
    this.productService.removeMain(item);
  }
  deleteButtonClick(item){
    if(item instanceof MouseEvent) return;
    this.productService.pushMain(item);
    this.productService.removeDeleted(item);
  }
  changeShow(){
    this.showDelete = !this.showDelete;
  }
}
