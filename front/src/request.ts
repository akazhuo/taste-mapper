import axios from 'axios';
 
const instance = axios.create({
  baseURL: 'localhost',
  timeout: 10000,
});
// 添加请求拦截器
instance.interceptors.request.use(config => {
  // start progress bar
  uni.showLoading({ title: '加载中...'})
  return config
}, error => {
  // do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(response => {
  uni.hideLoading()
   const res = response.data
    const error_code = isNaN(res.error_code) ? res.code : res.error_code
      
  if (error_code !== 0) {
      console.log(res)
      return Promise.reject(new Error(res.msg || res.message || 'Error'))
  }
  // 返回结果
  return res
}, error => {
  uni.hideLoading()
  return Promise.reject(error)
})