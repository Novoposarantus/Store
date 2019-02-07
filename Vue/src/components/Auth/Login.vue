<template>
    <div>
        <h2 class="text-center">Login in your account</h2>
        <form calss="form-group" @submit.prevent="onSubmit()">
            <label for="loginInput">Login</label>
            <input type="text" id="loginInput" class="form-control" v-model="form['login']">
            <label for="passwordInput">Password</label>
            <input type="password" id="passwordInput" class="form-control" v-model="form['password']">
            <button class="btn btn-success">Submit</button>
        </form>
        <button type="button" 
                @click="register()"
                class="btn">
            Or create new Account</button>
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
           login: 'auth/login' 
        }),
        onSubmit(){
            this.login(this.form)
            .then(()=>{
                this.$router.push('/products');
            })
        },
        register(){
            this.$router.push('/registration');
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
