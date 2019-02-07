import { Injectable } from "@angular/core";
import {CookieService} from 'ngx-cookie-service';
import {map} from 'rxjs/operators';
import { Observable } from "rxjs";

import { LoginUser,LoginResponse } from "../models";
import Config from '../../../config';
import { RequestService, TypeRequest } from "./request.service";
import { ServerService } from "./server.service";


@Injectable()
export class AuthService {
    constructor(private cookieService: CookieService,
                private http: RequestService,
                private server: ServerService){}
                
    private permissions: string[] = [];
    status: AuthStatus = AuthStatus.logout;
    public get isAuthenticated() : boolean {
        if(this.server.isServer) return false;
        return this.cookieService.check('user-token');
    }  
    getPermissions(): string[]{
        if(this.server.isServer) return [];
        if (!this.isAuthenticated){
            this.permissions = [];
        }
        return this.permissions;
    }
    checkPermission(permission: string){
        if (this.server.isServer) return false;
        console.log(permission);
        console.log(this.isAuthenticated && this.permissions.includes(permission));
        return this.isAuthenticated && this.permissions.includes(permission);
    }
    login(user : LoginUser){
        this.status = AuthStatus.loading;
        let request = this.sendLoginInfo(user);
        request.subscribe((loginResponse)=>{
            this.cookieService.set('user-token',loginResponse.access_token,loginResponse.timeOut/(24*60));
            this.permissions = loginResponse.permissions;
            this.status = AuthStatus.loaded;
        },
        (error)=>{
            this.status = AuthStatus.error;
        })
        return request;
    }
    logout() {
        this.status = AuthStatus.logout;
        return this.cookieService.delete('user-token');
    }
    register(user : LoginUser){
        let request = this.sendRegistrtionInfo(user);
        request.subscribe();
        return request;
    }
    updatePermissionsList(): Observable<string[]>{
        this.status = AuthStatus.loading;
        let request = this.loadPermissionList();
        request.subscribe(permissions=>{
            this.permissions = permissions;
            this.status = AuthStatus.loaded;
        },
        (error)=>{
            this.status = AuthStatus.error;
        })
        return request;
    }
    private loadPermissionList() : Observable<string[]>{
        return this.http.send<{permissions:string[]}>(Config.getPermissionsForUser,TypeRequest.Get)
                        .pipe(map((value:{permissions:string[]})=> value.permissions));
    }
    private sendRegistrtionInfo(user : LoginUser){
        return this.http.send<LoginUser>(Config.registration,TypeRequest.Post,user);
    }
    private sendLoginInfo(user:LoginUser) : Observable<LoginResponse>{
        return this.http.send<LoginResponse>(Config.login,TypeRequest.Post,user);
    }
}

export enum AuthStatus{
    loaded,
    loading,
    logout,
    error
}