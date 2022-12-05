import { computed } from 'vue'

const useRankInfo = (props) => {
  const rankColorMap = {
    0: 'red',
    1: 'volcano',
    2: 'purple'
  }
  const rankInfo = computed(() => ({
    text: `${props.rank + 1}`,
    color: rankColorMap[props.rank] !== undefined ? rankColorMap[props.rank] : 'grey'
  }))
  return rankInfo
}

export default useRankInfo
