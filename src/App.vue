<script setup>
import { ref, onMounted } from 'vue'
import useMessage from '@/hooks/useMessage'
import Card from '@/components/Card.vue'

const message = useMessage()

const roomList = ref([])
const lastUpdateTime = ref('')
const isLoading = ref(true)

const fetchData = async () => {
  return fetch('api/rank100')
    .then((res) => res.json())
    .then((res) => {
      res.data.rooms.forEach((room) => {
        room.face = room.face + '@55w_55h'
      })
      roomList.value = res.data.rooms
      lastUpdateTime.value = new Date(res.data.ctime * 1000).toLocaleString()
    })
    .catch(() => {
      message.error('数据请求出错')
    })
}

onMounted(async () => {
  await fetchData().then(() => (isLoading.value = false))
  // 每10000ms更新数据
  setInterval(async () => {
    await fetchData()
  }, 10000)
})
</script>

<template>
  <div class="app">
    <a-page-header
      style="margin: 10px; width: 100%"
      title="虚拟区10分钟互动人数排行前百"
      sub-title="互动包括：弹幕、SC、礼物、舰长"
    >
      <template #extra>
        <a-tag>最后更新时间: {{ lastUpdateTime }}</a-tag>
      </template>
    </a-page-header>
    <a-spin :spinning="isLoading">
      <a-row justify="center" :gutter="[15, 15]">
        <a-col :span="4.8" v-for="r of roomList" :key="r.roomid">
          <Card :roomData="r"></Card>
        </a-col>
      </a-row>
    </a-spin>
    <a-page-footer style="text-align: center">
      <br />
      技术支持 <br />
      前端：<a href="https://github.com/ZiuChen" target="_blank">@ZiuChen</a>
      <br />
      后端：<a href="https://github.com/XiaoMiku01" target="_blank">@XiaoMiku01</a>
    </a-page-footer>
  </div>
</template>

<style lang="less">
@import './style/app.less';
</style>
