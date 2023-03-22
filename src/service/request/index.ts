import axios, { AxiosInstance } from 'axios'
import { ZUInterceptors, ZURequestConfig, ZUAxiosRequestConfig } from './type'
import useMessage from '@/hooks/useMessage'

const message = useMessage()

export default class ZURequest {
  instance: AxiosInstance // axios实例
  interceptors?: ZUInterceptors // 拦截器

  constructor(config: ZUAxiosRequestConfig) {
    this.instance = axios.create(config)

    // 如果传入拦截器, 则使用传入的拦截器, 否则使用默认的拦截器
    this.interceptors = config.interceptors

    // 将默认的拦截器和传入的拦截器合并
    // 将传入的拦截器放在默认拦截器之前, 以便传入的拦截器可以覆盖默认的拦截器
    if (this.interceptors) {
      this.instance.interceptors.request.use(
        this.interceptors?.requestInterceptor,
        this.interceptors?.requestInterceptorCatch
      )
      this.instance.interceptors.response.use(
        this.interceptors?.responseInterceptor,
        this.interceptors?.responseInterceptorCatch
      )
    }

    // 添加默认的响应拦截器
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

  request<T>(config: ZURequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果手动传入拦截器, 则使用手动传入的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }

      // 调用实例方法发送请求 获取响应类型为T的数据
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 使用手动传入的拦截器对响应数据进行处理
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

  get<T>(config: ZURequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: ZURequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: ZURequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: ZURequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
