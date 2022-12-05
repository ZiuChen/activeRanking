const useExternalLink = () => {
  return ({ type, id }) => {
    const linkMap = {
      bvid: 'https://www.bilibili.com/video/' + id,
      rid: 'https://live.bilibili.com/' + id,
      uid: 'https://space.bilibili.com/' + id
    }
    return linkMap[type]
  }
}

export default useExternalLink
