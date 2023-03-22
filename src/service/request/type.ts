import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface ZUInterceptors<T = AxiosResponse> {
  requestInterceptor?: (res: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface ZURequestInterceptors<T = AxiosResponse> {
  requestInterceptor: (res: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch: (err: any) => any
  responseInterceptor: (res: T) => T
  responseInterceptorCatch: (err: any) => any
}

// 创建axios实例时传入的配置 (使用的InternalAxiosRequestConfig)
export interface ZUAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZUInterceptors<T>
}

// 发起请求时传入的配置 (使用的AxiosRequestConfig)
export interface ZURequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZURequestInterceptors<T>
}
