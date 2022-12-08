import zuRequest from '../index'

export function requestOnlineList(type = 'online') {
  return zuRequest.get({
    url: '/as/rank?by=' + type
  })
}
