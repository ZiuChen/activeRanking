import zuRequest from '../index'
import { Response, RankData, HistoryData } from '@/types'

// 获取直播间排行榜数据
export function requestRankList() {
  return zuRequest.get<Response<RankData>>({
    url: '/rank100'
  })
}

// 获取直播间观看历史人数
export function requestRoomHistory(roomid: string) {
  return zuRequest.get<Response<HistoryData>>({
    url: '/history/' + roomid
  })
}
