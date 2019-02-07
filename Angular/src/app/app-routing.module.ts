import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent, 
         CreateProductComponent,
         LoginComponent,
         RegisterComponent,
         AccessUsersComponent,
         MenuRolesComponent,
         UserMenuComponent, 
         NEPComponent,
         Err404Component,
         CustomErrorComponent} from './components';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'createProduct',
    component: CreateProductComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'accessUsers',
    component: AccessUsersComponent
  },
  {
    path: 'roleMenu',
    component: MenuRolesComponent
  },
  {
    path: 'userMenu',
    component: UserMenuComponent
  },
  {
    path: 'notEnoughPermissions',
    component: NEPComponent
  },
  {
    path: 'pageNotFound',
    component: Err404Component
  },
  {
    path: 'somethingWasWrong',
    component: CustomErrorComponent
  },{
    path: '**',
    component: Err404Component
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
