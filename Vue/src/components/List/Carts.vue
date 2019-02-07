<template>
    <div>
        <div class="filter">
            <label>Filter by name: </label> 
            <input type="text" v-model="nameFilter">
        </div>
        <div class="filter"> 
            <label>Filter by category: </label> 
            <input type="text" v-model="categoryFilter">
        </div>
        <div class="filter"> 
            <label>Hide non-existent elements: </label> 
            <input type="checkbox" v-model="existFilter">
        </div>
        <div>
            <cart
                v-for="(item,index) in filterItems"
                :key="index"
                :item="item"
                @buttonClick="$emit('buttonClick', $event)"
            ></cart>
        </div>
    </div> 
</template>

<script>
import Cart from './Cart.vue';

export default {
    components:{
        Cart
    },
    props: {
        data: Array,
        button: String
    },
    name: 'carts',
    data (){
        return{
            nameFilter: '',
            categoryFilter: '',
            existFilter: false
        }
    },
    computed: {
        filterItems: function(){
            return this.data.filter((item) => {
                return (item.name.toString().toUpperCase().indexOf(this.nameFilter.toUpperCase()) !== -1) &&
                        (item.category.toString().toUpperCase().indexOf(this.categoryFilter.toUpperCase()) !== -1) &&
                        ((this.existFilter && item.exist) || !this.existFilter) 
            })
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
</style>
