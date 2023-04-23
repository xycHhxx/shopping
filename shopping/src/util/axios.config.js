/*axios的配置*/

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

//配置axios拦截器
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    //统一给后端发送localStorage现存的token
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`

    return config
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    //统一存后端传来的token
    // console.log(response.headers)

    const { authorization } = response.headers

    authorization && localStorage.setItem('token', authorization)
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    //登录过期即token失效时
    const { status } = error.response

    console.log(status)

    if (status === 401) {
      //重定向到login,当前页面打开URL
      window.location.href = '#/login'
    }

    return Promise.reject(error)
  }
)
