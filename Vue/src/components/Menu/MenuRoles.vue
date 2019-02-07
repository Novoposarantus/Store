<template>
    <div>
        <div class="d-flex flex-nowrap bd-highlight">
            <div v-for="role in roles"
                :key="role.roleId"
                @click="onClick(role)"
                :class="getClass(role.roleId)"
                class="p-2 bd-highlight border">
                {{role.name}}
            </div>
        </div>
        <template v-if="!addRole">
        <div>
            <div v-for="permission in permissions"
                    :key="permission.permissionId">
            <input type="checkbox" 
                    :id="permission.name" 
                    :value="permission.name"
                    v-model="permissionCkeckBoxList">
            <label>{{permission.name}}</label>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <button class="btn" @click="back">Back</button>
            <button class="btn btn-success" @click="submit">Submit</button>
            <button class="btn" @click="deleteRole">Delete Role</button>
        </div>
        </template>
        <template v-if="addRole">
        <hr>
        <input type="text" 
                v-model="newRoleName" 
                placeholder="Write new role name"
                class="form-control">
        <button class="btn d-block mx-auto" 
                @click="addNewRole">Add role</button>
        </template>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
    data(){
        return {
            checkedRole: {},
            permissionCkeckBoxList: [],
            addRole: true,
            newRoleName: '',
        }
    },
    methods : {
        ...mapActions({
            updateData : 'roleManager/updateData',    
            updateRole : 'roleManager/updateRole',
            removeRole : 'roleManager/removeRole',
            saveRole : 'roleManager/saveRole',

        }),
        onClick(role){
            this.checkedRole = role;
            this.permissionCkeckBoxList = [];
            this.addRole = false;
            for(let p of role.permissions){
                this.permissionCkeckBoxList.push(p);
            }
        },
        submit(){
            this.updateRole({
                roleId: this.checkedRole.roleId,
                name: this.checkedRole.name, 
                permissions: this.permissionCkeckBoxList
            })
            .then(()=>{
                this.back();
            })
        },
        addNewRole(){
            this.saveRole(this.newRoleName)
            .then(()=>{
                this.newRoleName = '';
                this.updateData();
            })
        },
        deleteRole(){
            this.removeRole(this.checkedRole.name)
            .then(()=>{
                this.updateData();
                this.back();
            })
        },
        back(){
            this.checkedRole = '',
            this.permissionCkeckBoxList = [];
            this.addRole = true;
        },
        getClass(roleId){
            return this.checkedRole.roleId === roleId ? ' checked' : '';
        }
    },
    computed:{
        ...mapGetters({
           permissions : 'roleManager/allPermissions',
           roles : 'roleManager/allRoles'
        }),
        checkboxValue(permission){
            return 
        }
    }
}
</script>

<style scoped>
.btn{
    margin: 10px 5px;
}
.border{
    padding: 10px;
    margin: 5px;
    transition: background 0.3s, color 0.3s;
}
.checked{
    background-color: #0278ff;
    color: white;
}
</style>

