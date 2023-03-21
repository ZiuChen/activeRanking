const useExternalLink = () => {
  const externalLink = ({ type, id }) => {
    const linkMap = {
      bvid: 'https://www.bilibili.com/video/' + id,
      rid: 'https://live.bilibili.com/' + id,
      uid: 'https://space.bilibili.com/' + id
    }
    return linkMap[type]
  }
  const handleExternalLinkClick = ({ type, id }) => {
    const link = externalLink({ type, id })
    if (link) {
      window.open(link)
    }
  }
  return [externalLink, handleExternalLinkClick]
}

export default useExternalLink
