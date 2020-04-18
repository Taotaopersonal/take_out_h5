<template>
  <div class="line-title">
    <div class="line"></div>
    <span class="text"><slot></slot></span>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name:"LineTitle"
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .line-title
    center()
    .line
      flex 1
      height 1px
      background-color rgba(255,255,255,.2)
    .text
      margin 0 12px
      font-size 14px
      font-weight 700
      color rgba(255,255,255,1)
      line-height 14px
      
    
</style>
