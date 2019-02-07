<template>
    <div>
        <h1>You don't have enought permission</h1>
        <button type="button" 
                @click="onClick"
                class="btn d-block mx-auto">Exit</button>
    </div>
</template>

<script>
export default {
    methods:{
        onClick(){
            this.$router.push('/products');
        }
    }
}
</script>

<style scoped>
h1{
    text-align: center;
    margin: 20px auto;
}
.btn{
    margin: 20px auto;
}
</style>


