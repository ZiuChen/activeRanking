<script setup>
import { ref, onMounted, watch } from 'vue'
import useMessage from '@/hooks/useMessage'
import Card from '@/components/Card.vue'

const message = useMessage()

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
  return fetch('api/rank100')
    .then((res) => res.json())
    .then((res) => {
      res.data.rooms.forEach((room) => {
        room.face = room.face + '@55w_55h'
      })
      const key = sortType.value ? sortMap[0].id : sortMap[1].id
      roomList.value = res.data.rooms.sort((a, b) => b[key] - a[key])
      lastUpdateTime.value = new Date(res.data.ctime * 1000).toLocaleString()
    })
    .catch(() => {
      message.error('数据请求出错')
    })
}

watch(sortType, () => {
  const key = sortType.value ? sortMap[0].id : sortMap[1].id
  roomList.value = roomList.value.sort((a, b) => b[key] - a[key])
  message.success(`已切换至${sortType.value ? sortMap[0].name : sortMap[1].name}`)
})

onMounted(async () => {
  await fetchData().then(() => (isLoading.value = false))
  // 每10000ms更新数据
  setInterval(async () => {
    await fetchData()
  }, 10000)
})

// true: 关键帧; false: 封面图;
const showFrame = ref(false)
watch(showFrame, () => {
  message.success(showFrame.value ? '已切换至关键帧' : '已切换至封面图')
})
</script>

<template>
  <div class="app">
    <a-page-header
      :ghost="false"
      style="width: 100%"
      title="虚拟区10分钟互动人数排行前百"
      sub-title="互动包括：弹幕、SC、礼物、舰长"
    >
      <template #extra>
        <a-tag>最后更新时间: {{ lastUpdateTime }}</a-tag>
        <span>
          <a-tag>{{ sortType ? sortMap[0].name : sortMap[1].name }}</a-tag>
          <a-switch v-model:checked="sortType" />
        </span>
        <span>
          <a-tag>{{ showFrame ? '关键帧' : '封面图' }}</a-tag>
          <a-switch v-model:checked="showFrame" />
        </span>
      </template>
    </a-page-header>
    <div class="ranking-table">
      <a-spin v-if="isLoading" :spinning="isLoading" />
      <a-row justify="center" :gutter="[15, 15]">
        <a-col :span="4.8" v-for="(room, index) in roomList" :key="room.roomid">
          <Card :roomData="room" :showFrame="showFrame" :rank="index"></Card>
        </a-col>
      </a-row>
    </div>

    <a-layout-footer class="footer" style="text-align: center">
      <a-tag>技术支持</a-tag>
      <a href="https://github.com/ZiuChen">
        <img
          src="https://img.shields.io/github/stars/ZiuChen?label=ZiuChen&logo=Github"
          alt="badge"
        />
      </a>
      <a href="https://github.com/XiaoMiku01">
        <img
          src="https://img.shields.io/github/stars/XiaoMiku01?label=XiaoMiku01&logo=Github"
          alt="badge"
        />
      </a>
    </a-layout-footer>
  </div>
</template>

<style lang="less">
@import './style/app.less';
</style>
