<template>
    <div>   
            <div class='filter'>
                <label>Show table to cart </label> 
                <input class="div-show" type="checkbox" v-model="showDiv">
            </div>
            <hr>
            <div>
                <transition name="flip" mode="out-in">
                    <component 
                        :data="data" 
                        :button="button"
                        :remove="['ID'].concat(framework)"
                        @buttonClick="$emit('buttonClick', $event)" 
                        :is="componet"
                    >
                    </component>
                </transition>
            </div>
    </div>
</template>

<script>
import Table from './Table.vue';
import Carts from './Carts.vue';
import {mapGetters} from 'vuex';

export default {
    components:{
        'my-table': Table,
        Carts
    },
    props: {
        data: Array,
        button: String
    },
    name: 'visual',
    data (){
        return{
            showDiv: false,
        }
    },
    computed:{
        ...mapGetters({
            permissions: 'auth/permissions'
        }),
        componet(){
            return this.showDiv ? 'carts' : 'my-table';            
        },
        framework(){
            console.log("New");
            console.log(this.permissions.includes('ShowFramework') ? [] : ['FRAMEWORK']);
            console.log(['ID'].concat(this.permissions.includes('ShowFramework') ? [] : ['FRAMEWORK']))
            return this.permissions.includes('ShowFramework') ? [] : ['FRAMEWORK'];
        }
    }
}
</script>

<style scoped>

.filter{
    display: flex;
    margin: 5px;
    font-size: 1.5em;
}
.filter label{
    margin-right: 5px;
}
.filter input{
    margin: auto 3px;
}

.flip-enter-active, .flip-leave-active{
  transition: 0.5s;
}
.flip-leave, .flip-enter{
  opacity: 0;
}
</style>
