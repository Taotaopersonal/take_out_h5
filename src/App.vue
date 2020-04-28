<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
// import Merchant from 'pages/route-merchant/merchant.vue'
import FooterGuide from "components/FooterGuide/FooterGuide.vue";
export default {
  name: "App",
  components: {
    FooterGuide
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
