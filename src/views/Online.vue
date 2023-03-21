<template>
  <div class="online">
    <Teleport to="#extra-operation">
      <div class="online-operation" v-show="isLoading === false && cPage.key === 'online'">
        <a-tag>最后更新时间: {{ lastUpdateTime }}</a-tag>
        <span>
          <a-button size="small" style="cursor: pointer" @click="handleSortTypeChange">{{
            sortType ? sortMap[0].name : sortMap[1].name
          }}</a-button>
        </span>
      </div>
    </Teleport>
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
import { ref, onMounted, inject } from 'vue'
import { requestOnlineList } from '@/service/online'
import useMessage from '@/hooks/useMessage'
import VideoCard from '@/components/VideoCard.vue'

const message = useMessage()
const cPage = inject('cPage')

const list = ref([])
const lastUpdateTime = ref('')
const isLoading = ref(true)
const intervalTimer = ref(null)

const fetchData = async (type = 'online') => {
  return requestOnlineList(type).then((res) => {
    res.data.list.forEach((item) => {
      item.owner.face = item.owner.face + '@55w_55h'
    })
    list.value = res.data.list
    lastUpdateTime.value = new Date(res.data.ctime * 1000).toLocaleString()
  })
}

const sortType = ref(true)
const sortMap = {
  0: {
    id: 'online',
    name: '在线人数'
  },
  1: {
    id: 'pubdate',
    name: '投稿时间'
  }
}
const handleSortTypeChange = async () => {
  sortType.value = !sortType.value
  isLoading.value = true

  // 1. 清理定时器
  // 2. 更新当前数据
  // 3. 重新设置interval

  clearInterval(intervalTimer.value)
  intervalTimer.value = null

  const key = sortType.value ? sortMap[0].id : sortMap[1].id
  await fetchData(key)
    .then(() => (isLoading.value = false))
    .then(() => message.success(`已切换至${sortType.value ? sortMap[0].name : sortMap[1].name}`))

  intervalTimer.value = setInterval(async () => {
    await fetchData(key)
  }, 10000)
}

onMounted(async () => {
  await fetchData().then(() => (isLoading.value = false))
  // 每10000ms更新数据
  intervalTimer.value = setInterval(async () => {
    await fetchData()
  }, 10000)
})
</script>

<style lang="less" scoped>
.online-operation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > * {
    margin: 5px;
  }
}

.online {
  &-table {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
