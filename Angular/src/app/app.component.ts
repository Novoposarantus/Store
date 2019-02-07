import { Component } from '@angular/core';
import {AuthService, OnInitService} from './servises';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService,
              private onInitService: OnInitService,
              public router: Router) {}
  
  showNav = false;

  get showLoadingIndicator() : boolean{
    return this.onInitService.status;
  }
  get isAuth():boolean{
    return this.authService.isAuthenticated;
  }
  get permissions(): string[]{
    return this.authService.getPermissions();
  }
  get createProduct(): boolean{
    return this.authService.checkPermission('CreateProduct');
  }
  get accessUsers(): boolean{
    return this.authService.checkPermission('ShowAccessUsers');
  }
  get roleMenu(): boolean{
    return this.authService.checkPermission('AccessToRoleManager');
  }
  get userMenu(): boolean{
    return this.authService.checkPermission('AccessToUserManager');
  }
  get mounted(): boolean{
    return true;
  }
  ngOnInit(){
    if (this.isAuth){
      this.authService.updatePermissionsList().subscribe(()=>{
        this.showNav = true;
      })
    }else{
      this.showNav = true;
    }
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
