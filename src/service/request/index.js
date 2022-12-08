import axios from 'axios'
import useMessage from '@/hooks/useMessage'

const message = useMessage()

export default class ZURequest {
  instance
  interceptors
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        // 响应成功, 但是服务器返回错误码
        if (data.code !== 0) {
          message.error(data.msg)
        }
        return data
      },
      (err) => {
        // 响应失败
        message.error('服务器响应失败')
        return err
      }
    )
  }
  request(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res)
          }
          return res
        })
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
  get(config) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }
}
