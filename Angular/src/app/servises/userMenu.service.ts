import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import Config from '../../../config';
import { ViewUser} from "../models";
import { RequestService, TypeRequest } from "./request.service";

@Injectable()
export class UserMenuService {
    constructor(private http:RequestService) {}
    private allUsers: ViewUser[] = [];
    getAllUsers(){
        return this.allUsers;
    }
    loadUsers(): Observable<ViewUser[]>{
        this.allUsers = [];
        let request = this.getUsersList();
        request.subscribe(users=>{
            this.allUsers = users;
        });
        return request;
    }
    
    updateUser(user: ViewUser): Observable<any>{
        let request = this.sendUserInfo(user);
        request.subscribe();
        return request;
    }
    private getUsersList(): Observable<ViewUser[]>{
        return this.http.send<ViewUser[]>(Config.getAllUsers,TypeRequest.Get);
    }
    private sendUserInfo(user: ViewUser): Observable<any>{
        return this.http.send(Config.updateUser,TypeRequest.Post,user);
    }
}