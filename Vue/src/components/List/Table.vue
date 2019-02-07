<template>
<div>
    <table class="table table-bordered">
        <thead>
            <tr>
                <td v-for="(value,key,index) in currentData[0]" 
                    :key="index">
                    {{jsUcfirst(key)}}
                </td>
                <td v-if="button"></td>
            </tr>
            <tr>
                <td v-for='(value,key,index) in currentData[0]'
                    :key="index">
                    <input :type="getInputType(typeof(value))" 
                           v-model="filter[key]">
                </td>
                <td v-if="button"></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in filterItems" :key="index">
                <td v-for="(column,key,index) in item"
                    :class="getClass(column)"
                    :key="index"
                    >
                {{column}}</td>
                <td v-if="button">
                    <button @click="onClick($event,item)"
                            class="btn btn-success">
                    {{button}}
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    props: {
        data: Array,
        button: String,
        remove: Array
    },
    name: 'myTable',
    data () {
        return{
            filter: {},
        }
    },
    methods:{
        jsUcfirst: (string)=>{
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getInputType: (type)=>{
            if (type == "boolean") return 'checkbox'
            else return 'text';
        },
        getClass: (value)=>{
            if (typeof(value) == "boolean") return value ? "true" : "false"
            else return ""
        },
        onClick(e,item){
                e.target.disabled = true;
                setTimeout(()=>{
                    e.target.disabled = false;
                },100)
                this.$emit('buttonClick', this.getDefaultItem(item));
        },
        getDefaultItem(newItem){
            if (this.remove){
                for(let item of this.data){
                    if (this.chekItem(item,newItem))
                        return item;
                }
            }
            return newItem
        },
        chekItem(item,newItem){
            for (let key in newItem){
                if (item[key] !== newItem[key]){
                    return false;
                }
            }
            return true;
        }
    },
    computed: {
        filterItems(){
            return this.currentData.filter((item) => {
                for(let key in this.filter){
                    let check = typeof(this.currentData[0][key]) == "boolean"
                            ? ((this.filter[key] && item[key]) || !this.filter[key])
                            : (item[key].toString().toUpperCase().indexOf(this.filter[key].toString().toUpperCase()) !== -1);
                    if (!check) return false;
                }
                return true;
            });
        },
        currentData(){
            if (this.remove){
                let newdata = [];
                for(let item of this.data){
                    let newItem = {};
                    for(let key in item){
                        if(!this.remove.includes(key.toUpperCase())){
                            newItem[key] = item[key];
                        }
                    }
                    newdata.push(newItem);
                }
                return newdata;
            }
            return this.data;
        },
        viewTable(){
            if (this.data.length == 0){
                return false;
            }else{
                for(let key in this.currentData[0]){
                    let value = (typeof(this.currentData[0][key]) == "boolean") ? false : '';
                    this.$set(this.filter,key,value);
                }
            }
            return true;
        }
    }

}
</script>

<style scoped>
tr:nth-child(2n) td{
    background-color: rgb(218, 218, 218);
}
.true{
    background-color: rgb(80, 245, 39) !important;
}
.false{
    background-color: rgb(248, 33, 33) !important;
    color: white !important;
}

.list-enter-active, .list-leave-active{
    transition: opacity 0.5s;
}

.list-enter{
    opacity: 0;
}

.list-leave-to{
    opacity: 0;
}

</style>
