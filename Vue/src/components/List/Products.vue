<template>
  <div>
    <div class='main'>
      <transition-group name="flip" 
                        class="main" 
                        tag="div"
                        mode="out-in">
        <div class="header" 
             v-if="deleteDataExist"
             key="view">
          <button @click="changeShow()"
                  class="btn">
            show delete table
          </button>
          <button v-if="deleteButton"
                  @click="onDelete"
                  class="btn">
            Delete All
          </button>
        </div>
        <visual
          v-if="mainData.length > 0"
          :data="mainData"
          button="delete"
          @buttonClick='mainButtonClick($event)'
          key="main"
        ></visual>
          <visual
            v-if="(showDelete == true && deletedData.length > 0)"
            :data="deletedData" 
            button="restore"
            @buttonClick='deleteButtonClick($event)'
            key="deleted"
          ></visual>
      </transition-group>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Visual from './Visual.vue';

export default {
  asyncData ({ store, route }) {
        return store.dispatch('products/updateData')
  },
  components:{
      Visual
  },
  data() {
    return {
      showDelete: false,
    }
  },
  methods:{
    ...mapActions({
      updateData : 'products/updateData',
      pushMain : 'products/pushMain',
      pushDeleted : 'products/pushDeleted',
      removeMain : 'products/removeMain',
      removeDeleted : 'products/removeDeleted',
      deleteProduct : 'products/deleteProduct'
    }),
    mainButtonClick(item) {
      this.pushDeleted(item);
      this.removeMain(item);
    },
    deleteButtonClick(item){
      this.pushMain(item);
      this.removeDeleted(item);
    },
    changeShow(){
      this.showDelete = !this.showDelete;
    },
    onDelete(){
        this.deleteProduct()
        .then(()=>{
          this.updateData();
        });
    },
  },
  computed: {
    ...mapGetters({
      mainData : 'products/mainData',
      deletedData : 'products/deletedData',
      isAuthenticated: 'auth/isAuthenticated',
      permissions: 'auth/permissions'
    }),
    deleteDataExist(){
        return this.deletedData.length > 0;
    },
    deleteButton(){
      if (this.isAuthenticated && this.permissions.includes('DeleteProducts')){
        return true;
      }
      return false;
    }
  }

}

</script>

<style scoped>
.btn{
  margin: 5px 0;
}
.main{
  display: flex;
}
.header{
  margin: 20px 10px;
}
.flip-enter-active{
  animation: Show 0.5s linear;
}
.flip-leave-active{
  animation: Hide 0.5s linear;
}
@keyframes Hide{
  from{opacity: 1;}
  to{opacity: 0;}
}
@keyframes Show {
  from {opacity: 0;}
  to {opacity: 1;}
}
</style>
