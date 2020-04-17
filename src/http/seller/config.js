// 该文件是发请求需要的原材料
export default {
  name: 'seller',
  api: {
    getSeller: {
      url: "/api/seller",
      method: "get",
      $toast:true
    }
  }
}
