<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{on:loginWay === 'message'}"
            @click="loginWay='message'"
          >短信登录</a>
          <a
            href="javascript:;"
            :class="{on:loginWay === 'password'}"
            @click="loginWay='password'"
          >密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay === 'message'}">
            <section class="login_message">
              <input
                type="tel"
                name="phone"
                maxlength="11"
                v-model="phoneNumber"
                placeholder="手机号"
                v-validate="`required|phone`"
              />
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button
                :disabled="!phoneNumberIsRight"
                class="get_verification"
                :class="{active:phoneNumberIsRight}"
                @click.prevent="getCode"
              >{{times>0 ? `验证码已发送${times}s` :`获取验证码`}}</button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                name="code"
                maxlength="6"
                v-model="code"
                placeholder="验证码"
                v-validate="'required|code'"
              />
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:loginWay === 'password'}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  name="name"
                  maxlength="11"
                  v-model="name"
                  placeholder="用户名"
                  v-validate="'required'"
                />
                <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input
                  :type="isShow?`text`:`password`"
                  name="pwd"
                  maxlength="8"
                  v-model="pwd"
                  placeholder="密码"
                  v-validate="'required'"
                />
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                <div
                  class="switch_button"
                  :class="isShow ? 'on' : 'off'"
                  @click="isShow = ! isShow"
                >
                  <div class="switch_circle" :class="{right:isShow}"></div>
                  <span class="switch_text">{{isShow?`隐藏`:`显示`}}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  name="captcha"
                  maxlength="4"
                  v-model="captcha"
                  placeholder="验证码"
                  v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}"
                />
                <span
                  style="color: red;"
                  v-show="errors.has('captcha')"
                >{{ errors.first('captcha') }}</span>
                <img
                  class="get_verification"
                  :src="staticImgBaseUrl + '/captcha'"
                  alt="captcha"
                  @click="tapChangeImg"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState, mapActions } from "vuex";
import { GET_LOGIN_INFO } from "store/mutation_types";
const OK = 0;
const ERROR = 1;
export default {
  name: "Login",
  data() {
    return {
      loginWay: "password",
      phoneReg: /^1[345678]\d{9}$/gim,
      times: 0,
      flag: true,
      isShow: false,

      // 表单数据
      phoneNumber: "",
      code: "",
      name: "",
      pwd: "",
      captcha: ""
    };
  },
  computed: {
    // ...mapState(["staticImgBaseUrl", "loginData"]),
    ...mapState({
      staticImgBaseUrl: state => state.wrap.staticImgBaseUrl,
      loginData: state => state.wrap.loginData
    }),
    phoneNumberIsRight() {
      let res = this.phoneReg.test(this.phoneNumber);
      return this.flag && res;
    }
  },
  methods: {
    ...mapActions([GET_LOGIN_INFO]),
    async getCode() {
      // 此部分是处理按钮倒计时和显示状态的逻辑
      this.flag = false;
      this.times = 30;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.times <= 1) {
          this.flag = true;
          clearInterval(this.timer);
        }
        this.times--;
      }, 1000);

      // 此部分是具体发送验证码的逻辑
      if (this.loginWay === "message") {
        const { code, msg } = await this.$http.wrap.getCode({
          phone: this.phoneNumber
        });
        if (code === OK) Toast.success("短信验证码发送成功");
        if (code === ERROR) {
          Toast.fail(msg);
          this.times = 0;
        }
      }
    },
    async login() {
      if (this.loginWay === "message") {
        const messageFromIsCommitSuccess = await this.$validator.validateAll([
          "phone",
          "code"
        ]);
        if (!messageFromIsCommitSuccess) return;

        await this[GET_LOGIN_INFO]({
          loginWay:this.loginWay,
          phone: this.phoneNumber,
          code: this.code
        });
      } else if (this.loginWay === "password") {
        const passwordFromIsCommitSuccess = await this.$validator.validateAll([
          "name",
          "pwd",
          "captcha"
        ]);
        if (!passwordFromIsCommitSuccess) return;
        await this[GET_LOGIN_INFO]({
          loginWay:this.loginWay,
          name: this.name,
          pwd: this.pwd,
          captcha: this.captcha,
          tapChangeImg:this.tapChangeImg
        });
      }
    },
    tapChangeImg() {
      this.$refs.captcha.src = `${
        this.staticImgBaseUrl
      }/captcha?time=${Date.now()}`;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.active {
                color: green;
                font-weight: bold;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              text-align: center;

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              &>.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(25px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
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
  }
}
</style>
