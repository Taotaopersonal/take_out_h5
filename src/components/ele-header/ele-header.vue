<template>
  <div class="header">
      <div class="top">
        <div class="left">
          <img :src="seller.avatar" class="avatar">
        </div>
        <div class="middle">
          <div class="titleInfo">
            <i class="brand"></i>
            <span class="sellerName">{{seller.name}}</span>
          </div>
          <div class="dispatchInfo">
            <span class="dispatchText">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
          </div>
          <div class="discountInfo" v-if="seller.supports && seller.supports[0]">
            <ele-icon :icon-size="1" :type="seller.supports[0].type"></ele-icon>
            <span class="discountText">{{seller.supports[0].content}}</span>
          </div>
        </div>
        <div class="right">
          <div class="btns" @click="showMask = true">
              <span class="btnText" v-if="seller.supports">{{seller.supports.length}}个</span>
              <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
      <div class="bottom" @click="showMask = true">
        <div class="bulletin">
          <i class="bulletinIcon"></i>
          <span class="bulletinText">{{seller.bulletin}}</span>
        </div>
        <i class="bulletin_arrow_right icon-keyboard_arrow_right"></i>
      </div>
      <div class="backgroundImg">
        <img :src="seller.bgImg" class="avatar">
      </div>
      <transition name="mask">
        <div class="mask" v-show="showMask">
          <div class="wrap">
            <div class="mian">
              <h2 class="title">{{seller.name}}</h2>
              <ele-star class="stars" :size="36" :score="seller.score"></ele-star>
              <ele-line class="line">优惠信息</ele-line>
              <ele-list class="list" :supports="seller.supports"></ele-list>
              <ele-line class="line">商家公告</ele-line>
              <p class="bulletinText">
                {{seller.bulletin}}
              </p>
            </div>
          </div>
          <div class="footer" @click="showMask = false">
            <i class="icon-close"></i>
          </div>
        </div>
      </transition>
  </div>
</template>

<script>
import Star from 'components/ele-star/ele-star.vue'
import lineTitle from 'components/ele-line/ele-line.vue'
import List from 'components/ele-list/ele-list.vue'
import {mapState} from 'vuex'
export default {
  name:"Header",
  data(){
    return{
      showMask:false
    }
  },
  components:{
    "ele-star":Star,
    "ele-line":lineTitle,
    "ele-list":List,
  },
  computed:{
    ...mapState(['seller'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/extend.styl"
  .header
    position relative
    background-color rgba(7,17,27,0.5)
    overflow hidden
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
          bottom -20px
          margin-right 12px
          background-color rgba(0,0,0,.2)
          border-radius 12px
          padding 7px 8px
          font-size 10px
          color rgba(255,255,255,1)
          font-weight 200
          line-height 12px
          white-space nowrap
          @media only screen and (max-width 325px)
            bottom -20px
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
      filter blur(3px)
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
          .stars
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
