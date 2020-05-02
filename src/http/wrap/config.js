import local from '@/util/local'
// 该文件是发请求需要的原材料
export default {
  name: 'seller',
  // baseUrl:"http://localhost:4000",
  api: {
    getAddress: {
      url: "/position/40.10038,116.36867",
      method: "get",
      corsUrl: "/4000",
    },
    getCategories: {
      url: "/index_category",
      method: "get",
      corsUrl: "/4000",
      token() {
        return local.get('token', '')
      } 
    },
    getShops: {
      url: "/shops",
      method: "get",
      corsUrl: "/4000",
      token() {
        return local.get('token', '')
      } 
    },
    getCode: {
      url: "/sendcode",
      method: "get",
      corsUrl: "/4000",
      $toast: true
    },
    getLoginInfoBySms: {
      url: "/login_sms",
      method: "post",
      corsUrl: "/4000",
    },
    getLoginInfoByPwd: {
      url: "/login_pwd",
      method: "post",
      corsUrl: "/4000",
    },
    autoLigin: {
      url: "/auto_login",
      method: "get",
      corsUrl: "/4000",
      token() {
        return local.get('token','')
      } 
    }
  },
  // hooks: {
  //   beforeReq(axiosConfig) {
  //     axiosConfig.headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYTk5Mjg1YjM2YTBlODNhYzZhNGY2YyIsImlhdCI6MTU4ODIxNzE2MSwiZXhwIjoxNTg4ODIxOTYxfQ.ns3YY7Qwwl0qWR1RJ-jxGqUKMgynDdDYzGpufXf1L84"
  //   }
  // }
}
