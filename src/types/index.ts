// 统一管理接口返回数据类型
export interface Response<T> {
  code: number
  message?: string
  data: T
}

// 直播间排序数据
export interface RankData {
  rooms: Room[]
  ctime: number
}

// 单个直播间数据
export interface Room {
  roomid: number
  uid: number
  title: string
  uname: string
  system_cover: string
  cover: string
  face: string
  parent_id: number
  parent_name: string
  area_id: number
  area_name: string
  area_v2_parent_id: number
  area_v2_parent_name: string
  area_v2_id: number
  area_v2_name: string
  start_time: number
  count: number
  ten_minutes_counter: number
}

// 视频排序数据
export interface VideoData {
  list: VideoItem[]
  ctime: number
}

// 视频排序数据榜单
export interface VideoItem {
  aid: number
  videos: number
  tid: number
  tname: string
  copyright: number
  pic: string
  title: string
  pubdate: number
  desc: string
  state: number
  duration: number
  owner: Owner
  stat: Stat
  dynamic: string
  cid: number
  dimension: Dimension
  short_link_v2: string
  bvid: string
  tag_name: string
  tag_id: number
  total_number_text: string
  up_from_v2?: number
  mission_id?: number
  season_id?: number
}

export interface Dimension {
  width: number
  height: number
  rotate: number
}

export interface Stat {
  aid: number
  view: number
  danmaku: number
  reply: number
  favorite: number
  coin: number
  share: number
  now_rank: number
  his_rank: number
  like: number
  dislike: number
}

export interface Owner {
  mid: Mid | number
  name: string
  face: string
}

export interface Mid {
  s: number
  e: number
  c: number[]
}

// 历史互动人数
export type HistoryData = number[][]
