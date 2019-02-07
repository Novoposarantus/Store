import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';

@Injectable()
export class RequestService {
    constructor(private httpClient: HttpClient,
                private cookieService:CookieService,
                private server: ServerService) {}

    send<T>(url:string, type:TypeRequest, object = null): Observable<T>{
        let isAuth: boolean = this.server.isServer ? false : this.cookieService.check('user-token');
        switch(type){
            case 'POST': {
                return this.httpClient.post<T>(url,object,{
                    headers: isAuth ? 
                             new HttpHeaders().append('Authorization',"Bearer " + this.cookieService.get('user-token'))
                             : {}
                })
            }
            case 'GET': {
                return this.httpClient.get<T>(url,{
                    headers: isAuth ? 
                             new HttpHeaders().append('Authorization',"Bearer " + this.cookieService.get('user-token')) 
                             : {}
                })
            }
        }
    }
}
export enum TypeRequest{
    Post='POST',
    Get='GET'
}