import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { RequestService, TypeRequest} from "./request.service";
import { AccessUser } from "../models";
import Config from '../../../config';

@Injectable()
export class AccessDataService {
    constructor(private http:RequestService) {}

    private accessData: AccessUser[] = [];

    getAccessData(): AccessUser[]{
        return this.accessData;
    }
    updateData():Observable<AccessUser[]>{
        this.accessData = [];
        let request = this.loadData();
        request.subscribe(data=>{
            this.accessData = data;
        })
        return request;
    }
    private loadData():Observable<AccessUser[]>{
        return this.http.send<AccessUser[]>(Config.accessData,TypeRequest.Get)
    }
}