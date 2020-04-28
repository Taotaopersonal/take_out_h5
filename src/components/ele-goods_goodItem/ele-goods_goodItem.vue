<template>
  <ul class="itemList">
    <li class="item" v-for="(item,index) in goodFoods" :key="index">
      <div class="avatar">
        <img class="itemImg" :src="item.image" alt="">
      </div>
      <div class="itemInfo">
        <h3 class="itemName">{{item.name}}</h3>
        <span class="itemDescription">{{item.description}}</span>
        <div class="ratings">
          <span class="itemSellCount">月售{{item.sellCount}}份</span>
          <span class="itemRating">好评率{{item.rating}}%</span>
        </div>
        <div class="prices">
          <span class="itemNewPrice">￥{{item.price}}</span>
          <span class="itemOldPrice" v-show="item.oldPrice">￥{{item.oldPrice}}</span>
        </div>
      </div>
      <ele-control class="control" :item="item"></ele-control>
    </li>
  </ul>
</template>

<script>
import Control from 'components/ele-goods_goodItem_control/ele-goods_goodItem_control.vue'
export default {
  name:"GoodItem",
  props:{
    goodFoods:Array
  },
  data() {
    return {
      topLocationArr:[]
    }
  },
  components:{
    "ele-control":Control
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
  .itemList
    .item
      display flex
      padding 18px
      one-px(rgba(7,17,27,.1))
      &:after
        width 90%
        left 0
        right 0
        margin auto
      &:last-child
        border-none()
      .avatar
        height 64px
        margin-right 10px
        flex 0 0 64px
        .itemImg
          width 100%
          height 100%
      .itemInfo
        display flex
        flex-direction column
        justify-content space-around
        flex 1
        color rgba(147,153,159,1)
        .itemName
          margin-top 2px
          font-size 14px
          font-weight bold
          color rgba(7,17,27,1)
        .itemDescription
          font-size 10px
        .ratings
          font-size 10px
          .itemSellCount
            margin-right 12px
        .prices
          .itemNewPrice
            margin-right 8px
            font-weight 700
            font-size 14px
            color red
          .itemOldPrice
            font-weight 700
            font-size 10px
            text-decoration line-through
      .control
        position absolute
        right 18px 
        bottom 5px
</style>
