<script setup>
import { ref, onMounted, watch } from 'vue'
import useMessage from '@/hooks/useMessage'
import Card from '@/components/Card.vue'

const message = useMessage()

const roomList = ref([])
const lastUpdateTime = ref('')
const isLoading = ref(true)

// 按不同规则排序
const sortConditions = [
  {
    id: 'ten_minutes_counter',
    name: '10分钟互动人数'
  },
  {
    id: 'count',
    name: '当前互动人数'
  }
]
const sortBy = ref(sortConditions[0])
const handleMenuClick = (ev) => {
  const { key } = ev
  sortBy.value = sortConditions.filter((s) => s.id === key)[0]
  roomList.value = roomList.value.sort((a, b) => b[key] - a[key])
}

const fetchData = async () => {
  return fetch('api/rank100')
    .then((res) => res.json())
    .then((res) => {
      res.data.rooms.forEach((room) => {
        room.face = room.face + '@55w_55h'
      })
      const key = sortBy.value.id
      roomList.value = res.data.rooms.sort((a, b) => b[key] - a[key]) // 每次请求数据 都按照当前排序规则重新排序
      lastUpdateTime.value = new Date(res.data.ctime * 1000).toLocaleString()
    })
    .catch((err) => {
      console.log(err)
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

// true: 关键帧; false: 封面图;
const showFrame = ref(false)
watch(showFrame, (val) => {
  message.success(val ? '已切换至关键帧' : '已切换至封面图')
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
      <template #tags>
        <a-tag>更新时间 {{ lastUpdateTime }}</a-tag>
      </template>
      <template #extra>
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <template v-for="c of sortConditions" :key="c.id">
                <a-menu-item>{{ c.name }}</a-menu-item>
              </template>
            </a-menu>
          </template>
          <a-dropdown-button size="small">
            {{ sortBy.name }}
          </a-dropdown-button>
        </a-dropdown>
        {{ showFrame ? '关键帧' : '封面图' }}
        <a-switch size="small" v-model:checked="showFrame" />
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
