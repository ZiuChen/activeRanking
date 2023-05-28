<template>
  <div class="online">
    <Teleport to="#extra-operation">
      <div class="online-operation">
        <a-tag>
          {{ showOperation ? `最后更新时间: ${lastUpdateTime}` : '正在获取最新数据...' }}
        </a-tag>
        <a-button
          v-show="showOperation"
          size="small"
          style="cursor: pointer"
          @click="handleSortTypeChange"
          >{{ sortTypeComputed.name }}</a-button
        >
      </div>
    </Teleport>
    <div class="online-table">
      <!-- 仅在首次进入页面时展示加载状态 -->
      <a-spin v-if="isLoading && !list.length" :spinning="isLoading" />
      <a-row justify="center" :gutter="[15, 15]">
        <a-col :span="4.8" v-for="(item, index) in list" :key="item.bvid">
          <VideoCard :videoData="item" :rank="index"></VideoCard>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Response, VideoData, VideoItem } from '@/types'
import { requestOnlineList } from '@/service/online'
import useMessage from '@/hooks/useMessage'
import VideoCard from '@/components/VideoCard.vue'

interface ISortItem {
  id: 'online' | 'pubdate'
  name: string
}

const sortMap: ISortItem[] = [
  {
    id: 'online',
    name: '在线人数'
  },
  {
    id: 'pubdate',
    name: '投稿时间'
  }
]

const list = ref<VideoItem[]>([])
const lastUpdateTime = ref('')
const isLoading = ref(true)
const sortType = ref(true)
const sortTypeComputed = computed(() => (sortType.value ? sortMap[0] : sortMap[1]))
const showOperation = computed(() => !isLoading.value && !!list.value.length)
let timer: number | null = null

const message = useMessage()

// 修改了排序方式后重新请求数据
watch(
  sortTypeComputed,
  async (type, prevType) => {
    // 清除之前的定时器
    if (timer) {
      clearInterval(timer)
      timer = null
    }

    await fetchData(type.id)

    // 重新开启定时器
    timer = setInterval(async () => {
      await fetchData(type.id)
    }, 10000)

    // !prevType 证明是第一次进入页面
    if (prevType) message.success(`已切换至${type.name}排序`)
  },
  {
    immediate: true
  }
)

async function fetchData(type = 'online') {
  isLoading.value = true

  return requestOnlineList(type)
    .then((res: Response<VideoData>) => {
      // 处理头像 获取55*55的头像
      res.data.list.forEach((item) => {
        item.owner.face = item.owner.face + '@55w_55h.webp'
        item.pic = item.pic.replace("http","https")
        item.pic = item.pic + '@150h.webp'
        console.log(item)
      })
      // 更新时间
      lastUpdateTime.value = new Date(res.data.ctime * 1000).toLocaleTimeString()
      return res.data.list
    })
    .then((data) => {
      // 将数据同步到视图
      list.value = data

      isLoading.value = false
      return data
    })
}

function handleSortTypeChange() {
  sortType.value = !sortType.value
  list.value.length = 0
}
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

.online-table {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
