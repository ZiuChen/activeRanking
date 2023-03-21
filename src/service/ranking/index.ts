import zuRequest from '../index'
import { Response, RankData, HistoryData } from '@/types'

export function requestRankList() {
  return zuRequest.get({
    url: '/rank100'
  }) as Promise<Response<RankData>>
}

export function requestRoomHistory(roomid: string) {
  return zuRequest.get({
    url: '/history/' + roomid
  }) as Promise<Response<HistoryData>>
}
