import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { concat } from 'rxjs/operators';

import { AuthService } from "./auth.service";
import { RequestService, TypeRequest} from "./request.service";
import { Permission,RoleJson} from "../models";
import Config from '../../../config';

@Injectable()
export class RoleMenuService {
    constructor(private http:  RequestService,
                private authService: AuthService) {}
    private allPermissions: Permission[] = [];
    private allRoles: RoleJson[] = [];
    getAllPermissions(){
        return this.allPermissions;
    }
    getAllRoles(){
        return this.allRoles;
    }

    updatePermissionsList(): Observable<Permission[]>{
        this.allPermissions = [];
        let request = this.loadPermissionsList()
        request.subscribe(permissions=>{
            this.allPermissions = permissions;
        })
        return request;
    }
    updateRolesList(): Observable<RoleJson[]>{
        this.allRoles = [];
        let request = this.loadRoleList()
        request.subscribe(roles=>{
            this.allRoles=roles;
        })
        return request;
    }
    updateData():Observable<any>{
        return forkJoin(this.updatePermissionsList(),this.updateRolesList());
    }
    updateRole(role:RoleJson):Observable<any>{
        let request = this.sendNewRoleInfo(role);
        request.subscribe(()=>{
            this.allRoles[this.allRoles.findIndex(el=>el.name==role.name)] = role;
            this.authService.updatePermissionsList();
        });
        return request;
    }
    saveRole(roleName:string):Observable<any>{
        let request = this.sendRoleList(roleName,Config.saveRole);
        request.subscribe((role:RoleJson)=>{
            this.allRoles.push(role);
        });
        return request;
    }
    removeRole(roleName:string):Observable<any>{
        let request = this.sendRoleList(roleName,Config.deleteRole);
        request.subscribe(()=>{
            this.allRoles = this.allRoles.filter(el=>el.name != roleName);
        });
        return request;
    }
    
    private loadPermissionsList(): Observable<Permission[]>{
        return this.http.send<Permission[]>(Config.getAllPermissions,TypeRequest.Get);
    }
    private loadRoleList(): Observable<RoleJson[]>{
        return this.http.send<RoleJson[]>(Config.getAllRoles,TypeRequest.Get);
    }
    private sendNewRoleInfo(role:RoleJson):Observable<any>{
        return this.http.send(Config.updateRole,TypeRequest.Post,role);
    }
    //Нужно другое название. Может удалять или добавлять роли в зависимости от url.
    private sendRoleList(roleName:string,url:string):Observable<any>{
        return this.http.send(url,TypeRequest.Post,{roleName});
    }
}