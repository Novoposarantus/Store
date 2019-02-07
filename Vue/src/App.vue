<template>
  <div id="app">
    <div v-if="mounted">
      <header>
        <h1>Welcome</h1>
      </header>
      <main>
      <nav>
        <ul class="list-group">
          <router-link v-if="createProduct" 
                      to="/create"
                      tag="li"
                      class="list-group-item">
            <a>Create Products</a>
          </router-link>
          <router-link to="/products"
                      tag="li"
                      class="list-group-item">
            <a>Products</a>
          </router-link>
          <router-link :to='"/" + login'
                      tag="li"
                      class="list-group-item">
            <a>{{login}}</a>
          </router-link>
          <router-link v-if="accessUsers" 
                      to="/accessedUsers"
                      tag="li"
                      class="list-group-item">
            <a>Accessed Users</a>
          </router-link>
          <router-link v-if="rolesManager" 
                      to="/rolesManager"
                      tag="li"
                      class="list-group-item">
            <a>Role Manager</a>
          </router-link>
          <router-link v-if="usersManager" 
                      to="/usersManager"
                      tag="li"
                      class="list-group-item">
            <a>Users Manager</a>
          </router-link>
        </ul>
      </nav>
      <div class="content">
        <!--<serverurl></serverurl>-->
          <router-view></router-view>
      </div>
      </main>
    </div>
    <div v-else>
      Loading
    </div>
  </div>
</template>

<script scoped>
import Products from './components/List/Products'
import Serverurl from './components/ServerURL'

import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

export default {
  name: 'app',
  data(){
    return{
      mounted: false,
    }
  },
  components:{
    Products,
    Serverurl
  },
  methods:{
    ...mapActions({
      secret : 'auth/secret',
      adminSecret: 'auth/adminSecret',
    })
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      permissions: 'auth/permissions',
      mainData: 'products/mainData'
    }),
    login(){
      return this.isAuthenticated ? 'Logout' : 'Login';
    },
    accessUsers(){
      return this.isAuthenticated && this.permissions.includes('ShowAccessUsers');
    },
    rolesManager(){
      return this.isAuthenticated && this.permissions.includes('AccessToRoleManager');
    },
    createProduct(){
      return this.isAuthenticated && this.permissions.includes('CreateProduct');
    },
    usersManager(){
      return this.isAuthenticated && this.permissions.includes('AccessToUserManager');
    }
  },
  beforeMount(){
    if(this.$store.getters['auth/isAuthenticated']){
      this.$store.dispatch('auth/getPermissions');
    }
  },
  mounted(){
    this.mounted = true;
  }
}
</script>

<style> 
body, html{
  padding: 0;
  margin: 0;
}
header{
  box-sizing: border-box;
  padding: 10px;
  min-height: 50px;
  background: black;
  color: white;
}
main{
  display: flex ;
}
h1{
  margin: 5px;
}
nav{
  display: flex ;
  box-sizing: border-box;
  padding: 10px;
  float: left;
}
.content{
  flex: 1;
  box-sizing: border-box;
  padding: 10px;
}
.list-group-item{
  transition: background 0.3s, color 0.3s;
}

.list-group-item a{
  text-decoration: none;
}

.list-group-item.active a{
  color: inherit;
}
.router-link-exact-active{
  background-color: #0278ff;
}
.router-link-exact-active a{
    color: white;
}
</style>
