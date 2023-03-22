export type ExternalLinkType = 'bvid' | 'rid' | 'uid'

export interface ExternalLinkInfo {
  type: ExternalLinkType
  id: string
}

const useExternalLink = () => {
  const externalLink = ({ type, id }: ExternalLinkInfo) => {
    return {
      bvid: 'https://www.bilibili.com/video/' + id,
      rid: 'https://live.bilibili.com/' + id,
      uid: 'https://space.bilibili.com/' + id
    }[type]
  }
  const handleExternalLinkClick = ({ type, id }: ExternalLinkInfo) => {
    const link = externalLink({ type, id })
    if (link) {
      window.open(link)
    }
  }
  return [externalLink, handleExternalLinkClick]
}

export default useExternalLink
