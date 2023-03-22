<template>
  <div class="ranking">
    <Teleport to="#extra-operation">
      <div class="ranking-operation">
        <a-tag>
          {{ showOperation ? `最后更新时间: ${lastUpdateTime}` : '正在获取最新数据...' }}
        </a-tag>
        <a-button
          v-show="showOperation"
          size="small"
          style="cursor: pointer"
          @click="handleSortTypeClick"
          >{{ sortTypeComputed.name }}</a-button
        >
        <a-button
          v-show="showOperation"
          size="small"
          style="cursor: pointer"
          @click="handleShowFrameChange"
          >{{ showFrame ? '关键帧' : '封面图' }}</a-button
        >
      </div>
    </Teleport>
    <div class="ranking-table">
      <a-spin v-if="isLoading && !list.length" :spinning="isLoading" />
      <a-row justify="center" :gutter="[15, 15]">
        <a-col :span="4.8" v-for="(room, index) in list" :key="room.roomid">
          <LiveCard :roomData="room" :showFrame="showFrame" :rank="index"></LiveCard>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Response, RankData, Room } from '@/types'
import { requestRankList } from '@/service/ranking'
import useMessage from '@/hooks/useMessage'
import LiveCard from '@/components/LiveCard.vue'

interface ISortItem {
  id: 'count' | 'ten_minutes_counter'
  name: string
}

const sortMap: ISortItem[] = [
  {
    id: 'count',
    name: 'B站高能榜'
  },
  {
    id: 'ten_minutes_counter',
    name: '10分钟互动人数'
  }
]

const list = ref<Room[]>([])
const lastUpdateTime = ref('')
const isLoading = ref(true)
const sortType = ref(0)
const sortTypeComputed = computed(() => (sortType.value ? sortMap[0] : sortMap[1]))
const showOperation = computed(() => !isLoading.value && !!list.value.length)
const showFrame = ref(false) // true: 关键帧 false: 封面图
const message = useMessage()
let timer: number | null = null

watch(
  sortTypeComputed,
  async (type, prevType) => {
    // 清除之前的定时器
    if (timer) {
      clearInterval(timer)
      timer = null
    }

    await fetchData()

    // 重新开启定时器
    timer = setInterval(async () => {
      await fetchData()
    }, 10000)

    // !prevType 证明是第一次进入页面
    if (prevType) message.success(`已切换至${type.name}排序`)
  },
  {
    immediate: true
  }
)

async function fetchData() {
  isLoading.value = true

  return requestRankList()
    .then((res: Response<RankData>) => {
      // 添加图片后缀
      res.data.rooms.forEach((room) => {
        room.face = room.face + '@55w_55h'
      })

      // 更新最后更新时间
      lastUpdateTime.value = new Date(res.data.ctime * 1000).toLocaleTimeString()

      return res.data.rooms
    })
    .then((data) => {
      // 对数据进行排序并更新到视图
      const key = sortTypeComputed.value.id
      list.value = data.sort((a, b) => b[key] - a[key])

      isLoading.value = false
      return data
    })
}

// 切换排序方式
function handleSortTypeClick() {
  sortType.value = sortType.value ? 0 : 1
  list.value.length = 0
}

function handleShowFrameChange() {
  showFrame.value = !showFrame.value
  message.success(showFrame.value ? '已切换至关键帧' : '已切换至封面图')
}
</script>

<style lang="less" scoped>
.ranking-operation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > * {
    margin: 5px;
  }
}

.ranking-table {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
