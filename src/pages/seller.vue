<template>
  <div>seller-vue   {{seller}}</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "Seller",
  computed:{
    ...mapState(['seller'])
  }
};
</script>

<style>
</style>