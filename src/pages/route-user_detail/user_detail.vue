<template>
  <div style="text-align:center;padding-top:50px">
    <span href="javascript:" class="go_back" @click="$router.back()">
      <i class="iconfont icon-jiantou2"></i>
    </span>
    <span>userDetail</span>
  </div>
</template>

<script>
export default {
  name: "UserDetail"
};
</script>

<style scoped lang="stylus">
  .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
</style>
