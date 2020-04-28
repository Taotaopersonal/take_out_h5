// 该文件是发请求需要的原材料
export default {
  name: 'seller',
  // baseUrl:"http://localhost:4000",
  api: {
    getAddress: {
      url: "/position/40.10038,116.36867",
      method: "get",
      corsUrl: "/4000"
    },
    getCategories: {
      url: "/index_category",
      method: "get",
      corsUrl: "/4000"
    },
    getShops: {
      url: "/shops?latitude=40.10038&longitude=116.36867",
      method: "get",
      corsUrl: "/4000"
    }
  }
}
