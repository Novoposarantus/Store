<template>
    <div>
      <my-table v-if="!selectedUser"
                :data="users"
                button="select"
                @buttonClick="onClick($event)">
        </my-table>
        <div v-else>
            <h2>{{selectedUser.userName}}</h2>
            <select class="form-control"
                    v-model="selectedUser.roleName">
                <template v-for="role in roles">
                    <option v-if="role.name == selectedUser.roleName"
                            :key="role.id"
                            selected>
                        {{role.name}}</option> 
                    <option v-else
                            :key="role.id">
                        {{role.name}}</option>
                </template>   
            </select>
            <div class="d-flex justify-content-center">
                <button class="btn" @click="back">Back</button>
                <button class="btn btn-success" @click="submit">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import Config from '../../../config.js';
import Table from '../List/Table.vue';
import {mapGetters,mapActions} from 'vuex';

export default {
    components:{
        'my-table' : Table
    },
    data(){
        return {
            selectedUser: null,
        }
    },
    computed: {
        ...mapGetters({
            users: 'usersManager/allUsers',
            roles: 'roleManager/allRoles'
        }),
    },
    methods: {
        ...mapActions({
            loadUsers : 'usersManager/loadUsers',
            updateUser: 'usersManager/updateUser',
            loadRoles : 'roleManager/loadRoles'
        }),
        onClick(user){
            this.selectedUser = user;
            this.loadRoles();
        },
        back(){
            this.selectedUser = null;
        },
        submit(){
            this.updateUser(this.selectedUser)
            .then(()=>{
                this.loadUsers()
            })
            .then(()=>{
                this.back();
            })
        }
    }
}
</script>

<style scoped>
.btn{
    margin: 10px 5px;
}
</style>
