<template>
  <div class="ranking">
    <Teleport to="#extra-operation">
      <div class="ranking-operation" v-show="isLoading === false && cPage.key === 'ranking'">
        <a-tag>最后更新时间: {{ lastUpdateTime }}</a-tag>
        <span>
          <a-button size="small" style="cursor: pointer" @click="handleSortTypeChange">{{
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

<script setup>
import { ref, inject, onMounted } from 'vue'
import { requestRankList } from '@/service/ranking'
import useMessage from '@/hooks/useMessage'
import LiveCard from '@/components/LiveCard.vue'

const message = useMessage()
const cPage = inject('cPage')

const roomList = ref([])
const lastUpdateTime = ref('')
const isLoading = ref(true)

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
const sortType = ref(false)

const fetchData = async () => {
  return requestRankList().then((res) => {
    res.data.rooms.forEach((room) => {
      room.face = room.face + '@55w_55h'
    })
    const key = sortType.value ? sortMap[0].id : sortMap[1].id
    roomList.value = res.data.rooms.sort((a, b) => b[key] - a[key])
    lastUpdateTime.value = new Date(res.data.ctime * 1000).toLocaleString()
  })
}

const handleSortTypeChange = () => {
  sortType.value = !sortType.value
  const key = sortType.value ? sortMap[0].id : sortMap[1].id
  roomList.value = roomList.value.sort((a, b) => b[key] - a[key])
  message.success(`已切换至${sortType.value ? sortMap[0].name : sortMap[1].name}`)
}

onMounted(async () => {
  await fetchData().then(() => (isLoading.value = false))
  // 每10000ms更新数据
  setInterval(async () => {
    await fetchData()
  }, 10000)
})

// true: 关键帧; false: 封面图;
const showFrame = ref(false)
const handleShowFrameChange = () => {
  showFrame.value = !showFrame.value
  message.success(showFrame.value ? '已切换至关键帧' : '已切换至封面图')
}
</script>

<style lang="less" scoped>
@import '../style/ranking.less';
</style>
