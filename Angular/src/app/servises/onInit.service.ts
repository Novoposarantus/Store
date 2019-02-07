import { Injectable } from "@angular/core";
import {AuthStatus, AuthService} from './auth.service';
import { Router } from "@angular/router";
import { Observable } from "rxjs";

type CallBack = () => Observable<any>;

@Injectable()
export class OnInitService {
    constructor(private authService: AuthService,
                private router: Router) {}
    status : boolean = false;
    checkPermission(permissionName: string, update: CallBack = undefined){
        this.status = true;
        switch(this.authService.status) {
            case AuthStatus.loaded: {
              this._checkPermission(permissionName, update);
              break;
            }
            case AuthStatus.loading:{
              let interval = setInterval(()=>{
                if (this.authService.status == AuthStatus.loaded){
                  clearInterval(interval);
                  this._checkPermission(permissionName, update);
                }
                else if (this.authService.status == AuthStatus.error){
                  clearInterval(interval);
                  this.router.navigateByUrl('/somethingWasWrong', { skipLocationChange: true });
                }
              },100)
              break;
            }
            case AuthStatus.error:{
              this.router.navigateByUrl('/somethingWasWrong', { skipLocationChange: true });
              break;
            }
            default: {
              this.router.navigateByUrl('/pageNotFound', { skipLocationChange: true });
              break;
            }
          }
    }
    private _checkPermission(permissionName: string, update: CallBack = undefined){
      if (this.authService.getPermissions().includes(permissionName)){
        if (update){
          update().subscribe(()=>{
            this.status = false;
          })
        }else{
          this.status = false;
        }
      }else{
        this.router.navigateByUrl('/notEnoughPermissions', { skipLocationChange: true });
      }
    }
}