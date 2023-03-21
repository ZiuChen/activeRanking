<template>
  <div class="ranking">
    <Teleport to="#extra-operation">
      <div class="ranking-operation" v-show="isLoading === false && cPage.key === 'ranking'">
        <a-tag>最后更新时间: {{ lastUpdateTime }}</a-tag>
        <span>
          <a-button size="small" style="cursor: pointer" @click="handleSortTypeClick">{{
            sortType ? sortMap[0].name : sortMap[1].name
          }}</a-button>
        </span>
        <span>
          <a-button size="small" style="cursor: pointer" @click="handleShowFrameChange">{{
            showFrame ? '关键帧' : '封面图'
          }}</a-button>
        </span>
      </div>
    </Teleport>
    <div class="ranking-table">
      <a-spin v-if="isLoading" :spinning="isLoading" />
      <a-row v-else justify="center" :gutter="[15, 15]">
        <a-col :span="4.8" v-for="(room, index) in roomList" :key="room.roomid">
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

const sortMap = {
  0: {
    id: 'count',
    name: 'B站高能榜'
  },
  1: {
    id: 'ten_minutes_counter',
    name: '10分钟互动人数'
  }
}

const roomList = ref<Room[]>([])
const lastUpdateTime = ref('')
const isLoading = ref(true)
const sortType = ref(0)
const showFrame = ref(false) // true: 关键帧 false: 封面图
const cPage = inject<any>('cPage')
const message = useMessage()

// 排序方式副作用
watch(sortType, (val) => {
  const key = val ? sortMap[0].id : sortMap[1].id

  // @ts-ignore
  roomList.value = roomList.value.sort((a, b) => b[key] - a[key])

  message.success(`已切换至${sortMap[val ? 0 : 1].name}排序`)
})

onMounted(() => {
  fetchData().then(() => (isLoading.value = false))
  // 每10000ms更新数据
  setInterval(() => {
    fetchData()
  }, 10000)
})

async function fetchData() {
  return requestRankList().then((res: Response<RankData>) => {
    res.data.rooms.forEach((room) => {
      room.face = room.face + '@55w_55h'
    })

    const key = sortType.value ? sortMap[0].id : sortMap[1].id
    // @ts-ignore
    roomList.value = res.data.rooms.sort((a, b) => b[key] - a[key])
    lastUpdateTime.value = new Date(res.data.ctime * 1000).toLocaleString()
  })
}

// 切换排序方式
function handleSortTypeClick() {
  sortType.value = sortType.value ? 0 : 1
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
