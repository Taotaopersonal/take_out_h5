import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

// 提示信息本地化
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号',
    code: '验证码',
    name: '用户名',
    pwd: '密码',
    captcha:'图形验证码'
  }
})

// 自定义验证规则
VeeValidate.Validator.extend('phone', {
  validate: value => {
    return /^1[345678]\d{9}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})

// 自定义验证规则
VeeValidate.Validator.extend('code', {
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  getMessage: field => field + '必须是6位数字'
})
