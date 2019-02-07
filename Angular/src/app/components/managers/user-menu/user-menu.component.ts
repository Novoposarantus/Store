import { Component, OnInit } from '@angular/core';
import { ViewUser, RoleJson } from '../../../models';
import { UserMenuService, AuthService, RoleMenuService, OnInitService } from '../../../servises';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  providers: [UserMenuService, RoleMenuService]
})
export class UserMenuComponent implements OnInit {

  constructor(private userMenuService:  UserMenuService,
              private roleMenuService: RoleMenuService,
              private onInitService: OnInitService) { }

  ngOnInit() {
    this.onInitService.checkPermission('AccessToRoleManager',()=>{
      return this.userMenuService.loadUsers();
    })
  }

  selectedUser: ViewUser = null;

  get users(): ViewUser[]{
    return this.userMenuService.getAllUsers();
  }
  get roles(): RoleJson[]{
    return this.roleMenuService.getAllRoles();
  }
  onClick(user){
      this.roleMenuService.updateRolesList()
      this.selectedUser = user;
  }
  back(){
    this.selectedUser = null;
  }
  submit(){
    this.userMenuService.updateUser(this.selectedUser);
    this.back();
  }
}
