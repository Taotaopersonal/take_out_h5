import axios from 'axios'
import config from './config'
const axiosIns = axios.create({
  baseURL: config.baseUrl || '',
  timeout: config.timeout || 5000
})

// 为axios实例添加拦截器
axiosIns.interceptors.request.use(axiosConfig => {
  return axiosConfig
})

axiosIns.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  })

export default axiosIns

