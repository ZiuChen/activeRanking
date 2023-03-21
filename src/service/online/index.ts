import zuRequest from '../index'
import { Response, VideoData } from '@/types'

export function requestOnlineList(type = 'online') {
  return zuRequest.get({
    url: '/as/rank?by=' + type
  }) as Promise<Response<VideoData>>
}
