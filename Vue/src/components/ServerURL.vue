<template>
    <div id="main">
      <label>Write serverUrl</label>
      <input class="form-control" type="text" v-model="serverURL">
      <h2 v-if="getStatus">{{ getStatus }}</h2>
    </div>
</template>

<script>
import Config from '../../config.js';
import {mapGetters, mapActions} from 'vuex';

export default {
    methods:{
        ...mapActions({
            changeServer : 'products/changeServer'
        }),
    },
    beforeCreate(){
        this.$store.dispatch('products/changeServer', Config.server);
    },
    computed: {
        ...mapGetters({
            mainData : 'products/mainData',
            deletedData : 'products/deletedData',
            serverWork : 'products/serverWork',
            url : 'products/serverURL'
        }),
        serverURL: {
            get(){
                return this.url;
            },
            set(value){
                this.changeServer(value);
            }
        },
        getStatus(){
        if(this.serverWork){
            return "No available data on this server";
        }
        return false;
        }
    }
}
</script>

<style scoped>
h2{
    color: rgb(248, 36, 36);
    text-shadow: black 0 0 1px;
}
.status{
  display: block;
  margin: 3px auto;
  font-size: 1.4em;
  color: rgb(134, 0, 0);
  font-weight: bold; 
}
.server{
  min-width: 300px;
}
.form-control{
    margin-bottom: 10px;
}
#main{
    box-sizing: border-box;
    padding: 0 50px;
    margin-bottom: 30px;
}
</style>
