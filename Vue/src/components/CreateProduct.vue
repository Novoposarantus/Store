<template>
    <div>
        <form class="form-group" @submit.prevent="onSubmit">
            <label for="nameInput">Name</label>
            <input type="text" id="nameInput" class="form-control" v-model="form['name']">
            <label for="nameInput">Category</label>
            <input type="text" id="nameInput" class="form-control" v-model="form['category']">
            <label for="nameInput">Price</label>
            <input type="number" id="nameInput" class="form-control" v-model="form['price']">
            <label for="existBox">Exist in store</label>
            <input type="checkBox" id="existBox" class="form-check"
                   :checked="form['exist']" @change="onChange">
            <button class="btn btn-success">Submit</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data(){
        return{
            form:{
                name: '',
                category: '',
                price: 0,
                exist: true,
                framework: 'Vue'
            },
        }
    },
    methods:{
        ...mapActions({
            saveProduct : 'products/saveProduct',
            updateData : 'products/updateData',
        }),
        onSubmit(e){
            this.saveProduct(this.form)
            .then(()=>{
                this.updateData()
            })
            .then(()=>{
                this.$router.push('/products');
            })
        },
        onChange(e){
            this.form['exist'] = e.target.checked;
        }
    }
}
</script>

<style scoped>
.btn{
    display: block;
    margin: 5px auto;
}
</style>
