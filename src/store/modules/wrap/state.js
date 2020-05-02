import local from '@/util/local'
export default {
  imgBaseUrl: "https://fuss10.elemecdn.com",
  staticImgBaseUrl:"http://localhost:4000",
  addressObj: {},
  categories: [],
  shops: [],
  loginData: {},
  token: local.get('token') || ''
}
