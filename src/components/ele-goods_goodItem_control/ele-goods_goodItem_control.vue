<template>
  <div class="contorl">
      <transition name="contorlRemove">
       <i v-show="item.count > 0" class="layout-remove_circle_outline remove" @click="remove(item)"></i>
      </transition>
      <transition name="contorlSpan"> 
       <span v-show="item.count" class="remove">{{item.count}}</span>
      </transition>
       <i class="layout-add_circle add" @click="add(item)"></i>
  </div>
</template>

<script>
export default {
  name:"Control",
  props:{
    item:Object
  },
  methods: {
    remove(item){
      this.$bus.$emit("remove",item)
    },
    add(item){
      this.$bus.$emit("add",item)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
    .contorl
        center()
        display inline-flex
        i
            display inline-block
            font-size 24px
            vertical-align middle
            color rgba(0,160,220,1)
            &.add
                position relative
                z-index: 1
            &.remove
                opacity 1
                transform translate3d(0,0,0) rotate(-360deg)
        span
            display inline-block
            width 24px
            text-align center
            font-size 10px
            vertical-align middle
            color rgba(147,153,159,1)
            &.remove
                opacity 1
                transform translate3d(0,0,0) rotate(-360deg)
</style>
