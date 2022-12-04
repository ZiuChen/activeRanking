<template>
  <div class="online">
    <div class="online-table">
      <a-spin v-if="isLoading" :spinning="isLoading" />
      <a-row v-else justify="center" :gutter="[15, 15]">
        <a-col :span="4.8" v-for="(item, index) in list" :key="item.bvid">
          <VideoCard :videoData="item" :rank="index"></VideoCard>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useMessage from '@/hooks/useMessage'
import VideoCard from '@/components/VideoCard.vue'

const message = useMessage()

const list = ref([])
const lastUpdateTime = ref('')
const isLoading = ref(true)

const fetchData = async () => {
  return fetch('api/as/rank?by=online')
    .then((res) => res.json())
    .then((res) => {
      list.value = res.data.list
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

<style lang="less" scoped>
@import '../style/online.less';
</style>
