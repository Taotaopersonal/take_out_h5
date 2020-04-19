<template>
  <div class="stars">
    <div class="star" :class="[`star-${size}`,item]" v-for="(item,index) in scoreArr" :key="index"></div>
  </div>
</template>

<script>
export default {
  name:"Star",
  props:{
    size:Number,
    score:Number,
  },
  computed:{
    scoreArr(){
      const STAR_ARR_LENGTH = 5
      //构造返回星星数组
      //1.容错判断
      if(this.score === undefined) return ["off","off","off","off","off"]
      //2.根据分数计算星星数
      //计算需要展示的星星数,有0.5为有半星星,没有为没有半星
      let stars = Math.floor(this.score * 2) / 2 
      // 满星的数量
      let fullStars = Math.floor(stars)
      // 判断有无半星
      let needHalf = stars % 1
      
      //3.根据星星数构造数组
      let arr = []

      for(let i = 1; i <= fullStars; i++){
        arr.push("on")
      }
      needHalf ? arr.push("half") : ''

      while(arr.length < STAR_ARR_LENGTH) arr.push("off")
      return arr
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
  .stars
    center()
    .star
      background-repeat no-repeat
      background-size 100%
    &>.star-24
      width 10px
      height 10px
      margin-right 6px
      &:last-child
          margin-right 0
      &.on
        bg-image(star24_on)
      &.half
        bg-image(star24_half)
      &.off
        bg-image(star24_off)
    &>.star-36
      width 15px
      height 15px
      margin-right 9px
      &:last-child
          margin-right 0
      &.on
        bg-image(star36_on)
      &.half
        bg-image(star36_half)
      &.off
        bg-image(star36_off)
    &>.star-48
      width 20px
      height 20px
      margin-right 12px
      &:last-child
          margin-right 0
      &.on
        bg-image(star48_on)
      &.half
        bg-image(star48_half)
      &.off
        bg-image(star48_off)

</style>
