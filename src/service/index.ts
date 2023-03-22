import zuRequest from './request'

export default new zuRequest({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  timeout: import.meta.env.VITE_REQUEST_TIMEOUT,
  withCredentials: true
})
