<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
// import Merchant from 'pages/route-merchant/merchant.vue'
import FooterGuide from "components/FooterGuide/FooterGuide.vue";
// import { mapActions } from "vuex";
// import { AUTO_LOGIN } from "store/mutation_types";
export default {
  name: "App",
  components: {
    FooterGuide
  }
  // methods: {
  //   ...mapActions([AUTO_LOGIN])
  // },
  // created() {
  //   this[AUTO_LOGIN]();
  // }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
