<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  async mounted(){
    const result = await this.$http.seller.getSeller()
    console.log(result);
  }
};
</script>

<style scoped>
</style>
