<script setup>
import { computed, h } from 'vue'
import { Spin } from 'ant-design-vue'
import useEcharts from '@/hooks/useEcharts'
import useModal from '@/hooks/useModal'
import useExternalLink from '@/hooks/useExternalLink'

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

const Modal = useModal()
const externalLink = useExternalLink()

const coverLink = computed(() => {
  const { cover, system_cover } = props.roomData
  return props.showFrame ? system_cover : cover
})

const rankColorMap = {
  0: 'red',
  1: 'volcano',
  2: 'purple'
}

const rankInfo = computed(() => ({
  text: `${props.rank + 1}`,
  color: rankColorMap[props.rank] !== undefined ? rankColorMap[props.rank] : 'grey'
}))

const fetchChartData = async () => {
  return fetch('api/history/' + props.roomData.roomid).then((res) => res.json())
}

const handleChartClick = async () => {
  // 先展示Modal 后更新数据
  const modal = Modal.info({
    icon: h('li'),
    content: h(
      'div',
      { style: 'display: flex; justify-content: center; align-items: center; height: 300px' },
      h(Spin, { spinning: true, tip: '我知道你很急, 但你先别急' })
    ),
    okButtonProps: { style: 'display: none' }, // 隐藏footer按钮
    width: '85%',
    closable: true,
    wrapClassName: 'full-modal',
    maskClosable: true
  })

  const data = await fetchChartData()
  data.map((info) => (info[0] *= 1000)) // 秒时间戳 转 毫秒时间戳

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

<template>
  <a-badge-ribbon
    :text="rankInfo.text"
    :color="rankInfo.color"
    placement="start"
    style="z-index: 1"
  />
  <div class="card">
    <a :href="externalLink({ type: 'rid', id: roomData.roomid })" target="_blank">
      <img
        class="cover"
        src="../assets/loading.svg"
        v-lazy="coverLink"
        :title="roomData.title"
        alt="cover"
        crossOrigin="anonymous"
      />
    </a>

    <div class="content">
      <a :href="externalLink({ type: 'rid', id: roomData.roomid })" target="_blank">
        <div class="title" :title="roomData.title">
          {{ roomData.title }}
        </div>
      </a>

      <div class="info">
        <a :href="externalLink({ type: 'uid', id: roomData.uid })" target="_blank">
          <img
            class="face"
            src="../assets/loading.svg"
            v-lazy="roomData.face"
            :title="roomData.uname"
            alt="face"
          />
        </a>

        <div class="detail">
          <a :href="externalLink({ type: 'uid', id: roomData.uid })" target="_blank">
            <div class="uname" :title="roomData.uname">
              {{ roomData.uname }}
            </div>
          </a>

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
</template>

<style lang="less" scoped>
@import '../style/card.less';
</style>
