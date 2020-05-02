import {
  loading,
  success,
  fail
} from './toast'
// http工具文件，该文件负责接受axios实例，和相关模块config信息，加工处理返回相应的请求方法组成的对象
export default (axiosIns, config = {}) => {
  let modelName = config.name || "default";
  //根据config中的api生成不同的请求方法返回，不同模块的请求配置api是不同的，所以返回的请求方法也不同

  //看门狗，当config中的api配置不规范时，他会咬住，不放行
  if (!config.api) {
    throw new Error(`${modelName}配置文件中api选项是必须的`)
  }
  if (Object.prototype.toString.call(config.api) !== '[object Object]')
    throw new Error(`${modelName}配置文件中的api选项必须是一个object对象`)

  let httpObj = {}
  let api = config.api
  for (let apiName in api) {

    let {
      url,
      method,
      isForm,
      data: apiData,
      $toast,
      hooks,
      corsUrl,
      token
    } = api[apiName]

    apiData = apiData || {}
    hooks = hooks || {}

    let {
      beforeReq,
      afterReqSuccess,
      afterReqFail
    } = hooks;

    httpObj[apiName] = async (data = {}) => {

      let transformData;

      if (isForm) {
        transformData = new FormData()
        for (let key in data) {
          transformData.append(key, data[key])
        }
        for (let key in apiData) {
          transformData.append(key, apiData[key])
        }
      } else {
        // 合并对象的方法
        transformData = Object.assign(apiData, data)
      }

      //根据api的methods配置去发请求
      let result;

      //判断请求是否存在跨域请求,如果存在拼接对应交给devServer处理的跨域标识字段
      if (corsUrl) {
        url = corsUrl + url
        corsUrl = ''
      }
      // 判断请求是否需要携带请求头参数
      // let headers = {}
      // if (Object.prototype.toString.call(token) === '[object Function]') {
      //   headers = {
      //     authorization: token() || ''
      //   }
      // }

      let headers = {};
      let Authorization = (typeof token === "function")&&token()
      if(Authorization){
          headers = {Authorization}
      }
      

      try {
        $toast && loading()
        beforeReq && Object.prototype.toString.call(beforeReq) === '[object Function]' && beforeReq.call(config)
        switch (method) {
          case "get":
          case "delete":
            result = await axiosIns({
              method,
              url,
              params: transformData,
              headers
            })
            break;
          case "put":
          case "post":
            result = await axiosIns({
              method,
              url,
              data: transformData,
              headers
            })
            break;
        }
        $toast && success()
        afterReqSuccess && Object.prototype.toString.call(afterReqSuccess) === '[object Function]' && afterReqSuccess.call(config)

      } catch (error) {
        $toast && fail(error.message)
        afterReqFail && Object.prototype.toString.call(afterReqFail) === '[object Function]' && afterReqFail.call(config)
        return Promise.reject(error)
      }

      return result;
    }
  }
  return httpObj;
}
