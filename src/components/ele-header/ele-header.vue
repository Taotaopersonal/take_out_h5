<template>
  <div class="header">
      <div class="top">
        <div class="left">
          <img src="https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg" class="avatar">
        </div>
        <div class="middle">
          <div class="titleInfo">
            <i class="brand"></i>
            <span class="sellerName">粥品香坊（大运村）</span>
          </div>
          <div class="dispatchInfo">
            <span class="dispatchText">蜂鸟专送/38分钟送达</span>
          </div>
          <div class="discountInfo">
            <ele-icon :icon-size="1" icon-type="special"></ele-icon>
            <span class="discountText">在线支付满28减5，满50减10</span>
          </div>
        </div>
        <div class="right">
          <div class="btns">
              <span class="btnText">5个</span>
              <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
      <div class="bottom"></div>
  </div>
</template>

<script>
import Icon from 'components/ele-icon/ele-icon.vue'
export default {
  name:"Header",
  components:{
    "ele-icon":Icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .header
    background-color rgba(7,17,27,0.5)
    .top
        display flex
        padding 24px 0 18px 24px
      .left
        width 64px
        height 64px
        margin-right 16px
        .avatar
          width 100%
          height 100%
          border-radius 2px
      .middle
        .titleInfo
          display flex
          justify-content flex-start
          align-items center
          margin-top 2px
          margin-bottom 8px
          .brand
            bg-image(brand)
            display inline-block
            width 30px
            height 18px
            margin-right 6px
            background-repeat no-repeat
            background-size 100%
          .sellerName
            font-size 16px
            color rgba(255,255,255,1)
            font-weight bold
            line-height 18px
        .dispatchInfo
          .dispatchText
            font-size 12px
            color rgba(255,255,255,1)
            font-weight 200
            line-height 12px
        .discountInfo
          display flex
          justify-content flex-start
          align-items center
          margin-top 10px
          margin-bottom 2px
          .icon
            margin-right 4px
          .discountText
            font-size 10px
            color rgba(255,255,255,1)
            font-weight 200
            line-height 12px
      .right
        flex 1
        position relative
        .btns
          position absolute
          right 0 
          bottom -5px
          margin-right 12px
          background-color rgba(0,0,0,.2)
          border-radius 12px
          padding 7px 8px
          font-size 10px
          color rgba(255,255,255,1)
          font-weight 200
          line-height 12px
          white-space nowrap
          .btnText
            margin-right 2px
</style>
