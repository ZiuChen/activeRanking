import { computed } from 'vue'

const rankColorMap = ['red', 'volcano', 'purple']

// 用于计算排名信息的 hook 函数
const useRankInfo = (rank: number) => {
  return computed(() => ({
    text: `${rank + 1}`,
    color: rankColorMap[rank] !== undefined ? rankColorMap[rank] : 'grey'
  }))
}

export default useRankInfo
