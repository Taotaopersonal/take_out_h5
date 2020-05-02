import axios from 'axios'
import config from './config'
const axiosIns = axios.create({
  baseURL: config.baseUrl || '',
  timeout: config.timeout || 5000
})

// 为axios实例添加拦截器
axiosIns.interceptors.request.use(axiosConfig => {
  config.hooks && Object.prototype.toString.call(config.hooks.beforeReq) === '[object Function]' && config.hooks.beforeReq.call(config)
  return axiosConfig
})

axiosIns.interceptors.response.use(
  response => {
    config.hooks && Object.prototype.toString.call(config.hooks.afterReqSuccess) === '[object Function]' && config.hooks.afterReqSuccess.call(config,response.data)
    return response.data
  },
  error => {
    config.hooks && Object.prototype.toString.call(config.hooks.afterReqFail) === '[object Function]' && config.hooks.afterReqFail.call(config)
    return Promise.reject(error)
  })

export default axiosIns
