import { Component, OnInit } from '@angular/core';
import { RoleMenuService, AuthService, OnInitService } from '../../../servises';
import { Permission, RoleJson } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-roles',
  templateUrl: './menu-roles.component.html',
  styleUrls: ['./menu-roles.component.css'],
  providers: [RoleMenuService]
})
export class MenuRolesComponent implements OnInit {

  constructor(private roleMenuService: RoleMenuService,
              private onInitService: OnInitService) { }

  private checkedRole: RoleJson;
  private permissionCheckBoxList: string[] =  [];
  private addRole: boolean = true;
  private newRoleName: string = '';
  get permissions(): Permission[]{
    return this.roleMenuService.getAllPermissions();
  }
  get roles(): RoleJson[]{
    return this.roleMenuService.getAllRoles();
  }
  get view(): boolean{
    return this.roles.length > 0 && this.permissions.length > 0;
  }
  
  ngOnInit() {
    this.onInitService.checkPermission('AccessToRoleManager',()=>{
      return this.roleMenuService.updateData();
    })
  }
  onClick(role){
    this.checkedRole = role;
    this.permissionCheckBoxList = [];
    this.addRole = false;
    for(let p of role.permissions){
      this.permissionCheckBoxList = this.permissionCheckBoxList.concat(p);
    }
  }
  submit(){
    this.roleMenuService.updateRole({
      roleId: this.checkedRole.roleId,
      name: this.checkedRole.name,
      permissions: this.permissionCheckBoxList
    })
    this.back();
  }
  addNewRole(){
    this.roleMenuService.saveRole(this.newRoleName)
    this.newRoleName = '';
  }
  deleteRole(){
    this.roleMenuService.removeRole(this.checkedRole.name)
    this.back();
  }
  back(){
    this.checkedRole = null,
    this.permissionCheckBoxList = [];
    this.addRole = true;
  }
  getClass(roleId){
    if (this.checkedRole){
      return this.checkedRole.roleId == roleId ? 'checked' : '';
    }
  }
  onChangeCheckbox(permission){
    if (this.permissionCheckBoxList.indexOf(permission.name) > -1){
      this.permissionCheckBoxList = this.permissionCheckBoxList.filter(el=>el!=permission.name);
    }else{
      this.permissionCheckBoxList = this.permissionCheckBoxList.concat(permission.name);
    }
  }
}
