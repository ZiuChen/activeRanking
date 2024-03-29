import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'

// 统一管理 message 的配置
const useMessage = () => {
  message.config({
    duration: 2,
    maxCount: 3
  })
  return message
}

export default useMessage
