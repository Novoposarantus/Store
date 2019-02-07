import { Component, OnInit } from '@angular/core';
import { AccessDataService, AuthService, AuthStatus, OnInitService } from '../../servises';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-users',
  templateUrl: './access-users.component.html',
  styleUrls: ['./access-users.component.css'],
  providers: [AccessDataService]
})
export class AccessUsersComponent implements OnInit {

  constructor(private accessService: AccessDataService,
              private onInitService: OnInitService) { }
  
  ngOnInit() {
    this.onInitService.checkPermission('ShowAccessUsers',()=>{
      return this.accessService.updateData();
    })
  }
  get access() {
    return this.accessService.getAccessData();
  }
}
