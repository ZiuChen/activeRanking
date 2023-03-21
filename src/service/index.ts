import zuRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

export default new zuRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true
})
