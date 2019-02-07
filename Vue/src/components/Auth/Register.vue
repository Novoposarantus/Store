<template>
    <div>
        <h2 class="text-center">Registration new account</h2>
        <form calss="form-group" @submit.prevent="onSubmit()">
            <label for="loginInput">Login</label>
            <input type="text" id="loginInput" class="form-control" v-model="form['login']">
            <label for="passwordInput">Password</label>
            <input type="password" id="passwordInput" class="form-control" v-model="form['password']">
            <button class="btn btn-success">Submit</button>
        </form>
    </div>
</template>


<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return{
            form: {
                login: '',
                password: ''
            }
        }
    },
    methods:{
        ...mapActions({
            register: 'auth/register'
        }),
        onSubmit(){
            this.register(this.form);
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
.btn{
    display: block;
    margin: 10px auto;
}
</style>
