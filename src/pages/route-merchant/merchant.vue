<template>
  <div class="merchant">
    <ele-header></ele-header>
    <div class="navs">
      <div class="item">
        <router-link :to="`/merchant/${id}/api/goods`">商品</router-link>
      </div>
      <div class="item">
        <router-link :to="`/merchant/${id}/api/ratings`">评价</router-link>
      </div>
      <div class="item">
        <router-link :to="`/merchant/${id}/api/seller`">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
//引入icon图标组件库
import "common/stylus/icon.styl";
import Header from "components/ele-header/ele-header.vue";
import { mapActions } from "vuex";
import { GET_SELLER } from "store/mutation_types";
import store from "store";
export default {
  name: "Merchant",
  props: {
    id: String
  },
  components: {
    "ele-header": Header
  },
  methods: {
    ...mapActions([GET_SELLER])
  },
  async mounted() {
    await this[GET_SELLER](this.id);
    console.log(this.id, "actions");
  },
  beforeRouteUpdate(to, from, next) {
    if (store.state.wrap.loginData._id) {
      console.log(to.params.id);
      this[GET_SELLER](to.params.id);
      next();
    } else {
      next();
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl';

.merchant {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .navs {
    one-px(rgba(7, 17, 27, 0.1));
    display: flex;
    height: 40px;

    &>.item {
      flex: 1;

      a {
        center();
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: rgba(77, 85, 93, 1);
        line-height: 14px;

        &.active {
          color: rgba(240, 20, 20, 1);
        }
      }
    }
  }
}
</style>
