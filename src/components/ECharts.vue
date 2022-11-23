<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

const props = defineProps({
  eChartsId: {
    type: String,
    required: true
  },
  eChartsOption: {
    type: Object,
    required: true
  }
})

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

const chartResize = (container, charts) => {
  charts.style.width = container.style.width
  charts.style.height = container.style.height
}

onMounted(() => {
  const containerDOM = document.querySelector('.e-charts')
  const chartDOM = document.getElementById(props.eChartsId)
  const myChart = echarts.init(chartDOM)
  myChart.setOption(props.eChartsOption)
  chartResize(containerDOM, chartDOM)
})
</script>

<template>
  <div class="e-charts">
    <div :id="eChartsId" style="width: 100%; height: 400px"></div>
  </div>
</template>

<style lang="less" scoped>
.e-charts {
  width: 95%;
  height: 300px;
  margin: 0 auto;
}
</style>
