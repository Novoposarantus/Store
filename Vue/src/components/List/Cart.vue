<template>
    <div>
        <div class=cart>
            <div class="leftContainer">
                <div class="text">Name: <label>{{item.name}}</label></div>
                <div class="text">Category: <label> {{ item.category }} </label></div>
            </div>
            <div class="rightContainer">
                <div class="button" @buttonClick="$emit('buttonClick', item)"></div>
                <div class="exist">Exist:</div>
                <div :class="getClass(item.exist)"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    name: 'cart',
    methods:{
        getClass(exist){
            return exist == true ? "true" : "false";
        }
    }
}
</script>

<style scoped>
.cart{
    display: inline-block;

    width: 300px;
    height: 150px;

    border: 2px solid black;
    margin: 10px;
    background-color: rgb(188, 255, 255);
    box-sizing: border-box;
    border-radius: 20px;
}
.rightContainer, .leftContainer{
    box-sizing: border-box;
    height: 100%;
}
.rightContainer{
    width: 20%;
    float: right;
    display: flex;
    padding: 5px 5px 5px 0;
    flex-direction: column;
}
.leftContainer{
    width: 80%;
    float: left;
    padding: 15px;
}
.text{
    font-size: 1.2em;
    display: inline;
    font-weight: bold;
}
.text label{
    display: block;
    font-weight: normal;
}
div.exist{
    border-radius: 10px; 
}
.true, .false{
    flex: 1;
    border-radius: 10px;
}
.true{
    background-color: rgb(80, 245, 39) !important;
}
.false{
    background-color: rgb(248, 33, 33) !important;
}
div.button{
    height: 30px;
    background-color: red;
    border-left: 100% solid black;
    border-radius: 10px;
    text-align: center;
    padding: 3px 0;
    margin-bottom: 30px; 
    box-sizing: border-box;
}
</style>