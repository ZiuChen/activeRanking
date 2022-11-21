<script setup>
import { ref, onMounted } from 'vue'
import { Spin } from 'ant-design-vue'
import useMessage from '@/hooks/useMessage'
import Card from '@/components/Card.vue'

const message = useMessage()

message.config({
  duration: 2,
  maxCount: 3
})

const roomList = ref([])
const isLoading = ref(true)

const fetchData = async () => {
  return fetch('api/rank100')
    .then((res) => res.json())
    .then((res) => {
      res.data.rooms.forEach((room) => {
        room.face = room.face + '@55w_55h'
      })
      roomList.value = res.data.rooms
    })
    .then(() => {
      message.success('数据已更新 ' + new Date().toLocaleTimeString())
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
    <div class="container">
      <h1 class="title">虚拟区10分钟互动人数排行前百</h1>
      <p class="description">互动包括：弹幕、SC、礼物、舰长</p>
    </div>
    <a-spin :spinning="isLoading">
      <div class="overlay">
        <Card v-for="r of roomList" :key="r.roomid" :roomData="r"></Card>
      </div>
    </a-spin>
  </div>
</template>

<style lang="less" scoped>
@import './style/app.less';
</style>
