import zuRequest from '../index'

export function requestRankList() {
  return zuRequest.get({
    url: '/rank100'
  })
}

export function requestRoomHistory(roomid) {
  if (!roomid) throw new Error('roomid必传')
  return zuRequest.get({
    url: '/history/' + roomid
  })
}
