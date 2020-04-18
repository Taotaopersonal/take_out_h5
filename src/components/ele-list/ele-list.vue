<template>
  <ul class="list">
    <li class="item">
      <ele-icon class="icon" :icon-size="1" icon-type="decrease"></ele-icon>
      <span class="text">在线支付满28减5,满50减10</span>
    </li>
    <li class="item">
      <ele-icon class="icon" :icon-size="1" icon-type="discount"></ele-icon>
      <span class="text">在线支付满28减5,满50减10</span>
    </li>
    <li class="item">
      <ele-icon class="icon" :icon-size="1" icon-type="discount"></ele-icon>
      <span class="text">在线支付满28减5,满50减10</span>
    </li>
    <li class="item">
      <ele-icon class="icon" :icon-size="1" icon-type="invoice"></ele-icon>
      <span class="text">在线支付满28减5,满50减10</span>
    </li>
    <li class="item">
      <ele-icon class="icon" :icon-size="1" icon-type="invoice"></ele-icon>
      <span class="text">在线支付满28减5,满50减10</span>
    </li>
  </ul>
</template>

<script>
import Icon from '../ele-icon/ele-icon.vue'
export default {
  name:"List",
  components:{
    "ele-icon":Icon
  }
}
</script>

<style lang="stylus" scoped>
    .list
      .item
        margin-bottom 12px
        &:last-child
          margin-bottom 0
        .icon
          width 16px
          height 16px
          margin-right 6px
        .text
          position relative
          top -2px
          font-size 12px
          font-weight 200
          color rgba(255,255,255,1)
          line-height 12px
          
</style>
