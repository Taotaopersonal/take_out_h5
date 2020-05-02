<template>
  <div class="userDetail">
    <span href="javascript:" class="go_back" @click="$router.back()">
      <i class="iconfont icon-jiantou2"></i>
    </span>
    <span class="text">userDetail</span>
    <van-button class="btn" round type="info" @click="exitLogin">退出登录</van-button>
  </div>
</template>

<script>
import { Button, Toast } from "vant";
import { mapActions } from "vuex";
import { RESET_LOGIN_INFO } from "store/mutation_types";
export default {
  name: "UserDetail",
  components: {
    [Button.name]: Button
  },
  methods: {
    ...mapActions([RESET_LOGIN_INFO]),
    async exitLogin() {
      await this[RESET_LOGIN_INFO]();
      Toast.success({
        message: "注销成功！",
        duration: 2000,
        onClose: () => {
          this.$router.replace("/login");
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.userDetail {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;

  .text {
    margin-top: 200px;
    font-weight: bold;
  }

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

  .btn {
    position: absolute;
    width: 80%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    margin-bottom: 50px;
  }
}
</style>
