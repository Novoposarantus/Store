import { Component, OnInit } from '@angular/core';
import { ProductService, AuthService, OnInitService } from '../../../../servises';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router,
              private onInitService: OnInitService) { }

  form = {
    name:'',
    category: '',
    price: 0,
    exist: true
  }
  ngOnInit() {
    this.onInitService.checkPermission('CreateProduct');
  }
  onSubmit(){
    this.productService.saveProduct(this.form)
    this.router.navigateByUrl('/');
  }
}
