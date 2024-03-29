<template>
  <div class="live-card">
    <a-badge-ribbon
      :text="rankInfo.text"
      :color="rankInfo.color"
      placement="start"
      style="z-index: 1"
    />
    <div class="card">
      <img
        class="cover"
        src="../assets/image.svg"
        v-lazy="coverLink"
        :title="roomData.title"
        @click="handleExternalLinkClick({ type: 'rid', id: roomData.roomid })"
        alt="cover"
      />
      <div class="content">
        <div
          class="title"
          :title="roomData.title"
          @click="handleExternalLinkClick({ type: 'rid', id: roomData.roomid })"
        >
          {{ roomData.title }}
        </div>
        <div class="info">
          <img
            class="face"
            src="../assets/image.svg"
            v-lazy="roomData.face"
            :title="roomData.uname"
            @click="handleExternalLinkClick({ type: 'uid', id: roomData.uid })"
            alt="face"
          />
          <div class="detail">
            <div
              class="uname"
              :title="roomData.uname"
              @click="handleExternalLinkClick({ type: 'uid', id: roomData.uid })"
            >
              {{ roomData.uname }}
            </div>
            <div class="status">
              <div class="counter" title="10分钟互动人数">
                <img class="counter-icon" src="../assets/account.svg" alt="icon" />
                <span class="counter-span">{{ roomData.ten_minutes_counter }}</span>
              </div>
              <div class="counter" title="B站高能榜">
                <img class="counter-icon" src="../assets/hot-fill.svg" alt="icon" />
                <span class="counter-span">{{ roomData.count }}</span>
              </div>
              <div class="chart" title="历史人数" @click="handleChartClick">
                <img class="chart-icon" src="../assets/chart-line.svg" alt="icon" />
                <span class="chart-span">历史</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Spin } from 'ant-design-vue'
import { requestRoomHistory } from '@/service/ranking'
import useExternalLink from '@/hooks/useExternalLink'
import useRankInfo from '@/hooks/useRankInfo'

const props = defineProps({
  roomData: {
    type: Object,
    required: true
  },
  showFrame: {
    type: Boolean,
    required: true
  },
  rank: {
    type: Number,
    required: true
  }
})

const [_, handleExternalLinkClick] = useExternalLink()

const coverLink = computed(() => {
  const { cover, system_cover } = props.roomData
  return props.showFrame ? system_cover : cover
})

const rankInfo = useRankInfo(props.rank)

const fetchChartData = async () => {
  return requestRoomHistory(props.roomData.roomid).then((res) => res.data)
}

const handleChartClick = async () => {
  const useModal = await import('@/hooks/useModal').then((module) => module.default)

  const Modal = useModal()
  // 先展示Modal 后更新数据
  const modal = Modal.info({
    icon: h('li'),
    content: h(
      'div',
      { style: 'display: flex; justify-content: center; align-items: center; height: 300px' },
      h(Spin, { spinning: true, tip: '我知道你很急, 但你先别急' })
    ),
    // @ts-ignore
    okButtonProps: { style: 'display: none' }, // 隐藏footer按钮
    width: '85%',
    closable: true,
    wrapClassName: 'full-modal',
    maskClosable: true
  })

  const data = await fetchChartData()
  data.map((info: number[]) => (info[0] *= 1000)) // 秒时间戳 转 毫秒时间戳

  const useEcharts = await import('@/hooks/useEcharts').then((module) => module.default)

  const echarts = useEcharts({
    id: 'interactive-history-chart',
    title: '历史互动人数: ' + props.roomData.title,
    subText: '开播时间: ' + new Date(props.roomData.start_time * 1000).toLocaleString(),
    data: data
  })

  modal.update({
    content: echarts
  })
}
</script>

<style lang="less" scoped>
@import '../style/card.less';
</style>
