<template>
    <div>
      <my-table :data="access"
                :remove="['ID']"></my-table>
    </div>
</template>

<script>
import Config from '../../config.js';
import Table from './List/Table.vue';
import {mapGetters} from 'vuex';
import {CheckPermissions} from '../router.js';

export default {
    components:{
        'my-table' : Table
    },
    computed: {
        ...mapGetters({
            access : 'accessStore/access',
        }),
    }
}
</script>

<style scoped>

</style>
