import zuRequest from '../index'
import { Response, VideoData } from '@/types'

// 获取稿件在看人数榜单
export function requestOnlineList(type = 'online') {
  return zuRequest.get<Response<VideoData>>({
    url: '/as/rank?by=' + type
  })
}
