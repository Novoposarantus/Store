<template>
    <div>
    </div>
</template>

<script>

export default {
    beforeMount(){
        this.$store.dispatch('auth/logout');
        this.$router.push('/products');
    }
}
</script>
