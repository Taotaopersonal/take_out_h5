<template>
  <div class="header">
      <div class="top">
        <div class="left">
          <img src="https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg" class="avatar">
        </div>
        <div class="middle">
          <div class="titleInfo">
            <i class="brand"></i>
            <span class="sellerName">嘉禾一品（温都水城）</span>
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
      <div class="bottom">
        <div class="bulletin">
          <i class="bulletinIcon"></i>
          <span class="bulletinText">是以粥为特色的中式营养快餐，自2004年10月18日创立“嘉和一品”品牌至今，不断优化管理，积极创新，立足于“贴近百姓生活，服务千家万户”</span>
        </div>
        <i class="bulletin_arrow_right icon-keyboard_arrow_right"></i>
      </div>
      <div class="backgroundImg">
        <img src="https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg" class="avatar">
      </div>
      <div class="mask">
        <div class="wrap">
          <div class="mian">
            <h2 class="title">嘉禾一品（温都水城）</h2>
            <ele-star class="star"></ele-star>
            <ele-line class="line">优惠信息</ele-line>
            <ele-list class="list"></ele-list>
            <ele-line class="line">商家公告</ele-line>
            <p class="bulletinText">
              是以粥为特色的中式营养快餐，自2004年10月18日创立“嘉和一品”品牌至今，不断优化管理，积极创新，立足于“贴近百姓生活，服务千家万户”
              是以粥为特色的中式营养快餐，自2004年10月18日创立“嘉和一品”品牌至今，不断优化管理，积极创新，立足于“贴近百姓生活，服务千家万户”
            </p>
          </div>
        </div>
        <div class="footer">
          <i class="icon-close"></i>
        </div>
      </div>
  </div>
</template>

<script>
import Icon from 'components/ele-icon/ele-icon.vue'
import Star from 'components/ele-star/ele-star.vue'
import lineTitle from 'components/ele-line/ele-line.vue'
import List from 'components/ele-list/ele-list.vue'
export default {
  name:"Header",
  components:{
    "ele-icon":Icon,
    "ele-star":Star,
    "ele-line":lineTitle,
    "ele-list":List,
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/extend.styl"
  .header
    position relative
    background-color rgba(7,17,27,0.5)
    &>.top
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
    &>.bottom
      center()
      padding-left 12px
      padding-right 12px
      height 28px
      background-color rgba(7,17,27,.2)
      color rgba(255,255,255,1)
      .bulletin
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 10px
        font-weight 200
        margin-right 4px
        .bulletinIcon
          bg-image(bulletin)
          display inline-block
          width 22px
          height 12px
          background-repeat no-repeat
          background-size 100%
          margin-right 4px
        .bulletinText
          position relative
          top -2px
    &>.backgroundImg
      position absolute
      z-index -1
      left 0
      right 0
      bottom 0
      top 0
      filter blur(10px)
      img
        width 100%
        height 100%
    &>.mask
      position fixed
      z-index 9999
      overflow auto
      left 0
      top 0
      bottom 0
      right 0
      background-color rgba(7,17,27,.8)
      backdrop-filter blur(10px)
      .wrap
        min-height 100%
        .mian
          @extends .clearfix
          padding-bottom 96px
          width 80%
          margin 0 auto
          .title
            text-align center
            margin-top 64px
            font-size 16px
            font-weight 700
            color rgba(255,255,255,1)
            line-height 16px
          .star
            text-align center
            margin-top 16px
          .line
            margin 28px 0 24px 0
          .list
            margin-left 12px
          .bulletinText
            margin-left 12px
            font-size 12px
            font-weight 200
            color rgba(255,255,255,1)
            line-height 24px
      .footer
        margin-top -96px
        font-size 32px
        color rgba(255,255,255,.5)
        text-align center
        line-height 96px
</style>
