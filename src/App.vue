<template>
  <div id="app">
    <ele-header></ele-header>
    <div class="navs">
      <div class="item">
        <router-link to="/api/goods">商品</router-link>
      </div>
      <div class="item">
        <router-link to="/api/ratings">评价</router-link>
      </div>
      <div class="item">
        <router-link to="/api/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "components/ele-header/ele-header.vue";
export default {
  name: "App",
  components: {
    "ele-header": Header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./common/stylus/mixin.styl";
  #app
    .navs
      one-px(rgba(7,17,27,.1))
      display flex
      height 40px
      &>.item
        flex 1
        a
          center()
          width 100%
          height 100%
          font-size 14px
          color rgba(77,85,93,1)
          line-height 14px
          &.active
            color rgba(240,20,20,1)
</style>
