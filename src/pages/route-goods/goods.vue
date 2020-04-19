<template>
  <div class="goods">
    <div class="typeList" ref="typeList">
      <ul class="list">
        <li class="item" :class="{active:currentIndex === index}" v-for="(good,index) in goods" :key="index">
          <ele-icon v-show="good.type >= 0" class="icon" :icon-size="3" :type="good.type"></ele-icon>
          <span>{{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goodList"></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState,mapActions } from "vuex";
import { GET_GOODS } from "store/mutations_type";
export default {
  name: "Goods",
  data(){
    return{
      currentIndex:0
    }
  },
  methods: {
    ...mapActions([GET_GOODS])
  },
  computed: {
    ...mapState(["goods"])
  },
  mounted() {
    this[GET_GOODS]();
    new BScroll(this.$refs.typeList);
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
  .goods
    position absolute
    display flex
    left 0
    right 0
    top 178px
    bottom 56px
    .typeList
      width 80px
      overflow hidden
      .list
        .item
          center()
          padding 0 12px
          height 54px
          font-size 12px
          color grey
          line-height 14px
          one-px(rgba(7,17,27,.1))
          background-color #f3f5f7
          &.active
            background-color #ffffff
          &:last-child
            border-none()
          &:after
            width 80%
            left 0
            right 0
            margin auto
    .goodList
      flex 1
      background-color pink 
</style>
