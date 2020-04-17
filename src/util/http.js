import { loading, success, fail } from './toast'
// http工具文件，该文件负责接受axios实例，和相关模块config信息，加工处理返回相应的请求方法组成的对象
export default (axiosIns, config = {}) => {
  //根据config中的api生成不同的请求方法返回，不同模块的请求配置api是不同的，所以返回的请求方法也不同

  //看门狗，当config中的api配置不规范时，他会咬住，不放行
  if (!config.api) {
    throw new Error(`${config.name}配置文件中api选项是必须的`)
  }
  if (Object.prototype.toString.call(config.api) !== '[object Object]')
    throw new Error(`${config.name}配置文件中的api选项必须是一个object对象`)

  let httpObj = {}
  let api = config.api
  for (let apiName in api) {

    let { url, method, isForm, data: apiData, $toast,hooks } = api[apiName]
    
    httpObj[apiName] = async (data = {}) => {

      apiData = apiData || {}
      hooks = hooks || {}
      let {beforeReq,afterReqSuccess,afterReqFail} = hooks;
      
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
        transformData = Object.assign(apiData,data)
      }

      //根据api的methods配置去发请求
      let result;

      try {
        $toast && loading()
        beforeReq&&Object.prototype.toString.call(beforeReq) === '[object Function]' && beforeReq.call(config)
        switch (method) {
          case "get":
          case "delete":
            result = await axiosIns({
              method,
              url,
              params: transformData
            })
            break;
          case "put":
          case "post":
            result = await axiosIns({
              method,
              url,
              data: transformData
            })
            break;
        }
        $toast && success()
        afterReqSuccess&&Object.prototype.toString.call(afterReqSuccess) === '[object Function]' && afterReqSuccess.call(config)

      } catch (error) {
        $toast && fail(error.message)
        afterReqFail&&Object.prototype.toString.call(afterReqFail) === '[object Function]' && afterReqFail.call(config)
      }

      return result;
    }
  }
  return httpObj;
}
