import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service'
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeysPipe, FilterItemsPipe, CurrentDataPipe} from './pipes';
import { ProductsComponent,
         RegisterComponent,
         LoginComponent,
         AccessUsersComponent,
         TableComponent,
         CreateProductComponent,
         MenuRolesComponent,
         UserMenuComponent,
         NEPComponent,
         Err404Component,
         CustomErrorComponent
        } from './components';
import { AuthService, 
         RequestService, 
         ProductService,
         ServerService, 
         OnInitService} from './servises';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    KeysPipe,
    FilterItemsPipe,
    CurrentDataPipe,
    ProductsComponent,
    CreateProductComponent,
    LoginComponent,
    RegisterComponent,
    AccessUsersComponent,
    MenuRolesComponent,
    UserMenuComponent,
    NEPComponent,
    Err404Component,
    CustomErrorComponent
  ],
  imports:[
    CommonModule,
    NgtUniversalModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [CookieService, 
              AuthService, 
              RequestService,
              ProductService,
              ServerService,
              OnInitService
              ],
})
export class AppModule { }
