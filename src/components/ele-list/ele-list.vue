<template>
  <ul class="list" v-if="supports">
    <li class="item" v-for="(item,index) in supports" :key="index">
      <ele-icon class="icon" :icon-size="2" :type="item.type"></ele-icon>
      <span class="text">{{item.content}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name:"List",
  props:{
    supports:Array,
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
