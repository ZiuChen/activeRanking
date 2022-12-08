import { h } from 'vue'
import ECharts from '@/components/ECharts.vue'

const useEcharts = ({ id, title, subText, data }) => {
  return h(ECharts, {
    eChartsId: id,
    eChartsOption: {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: function (pt) {
          return [pt[0] + 20, '20%']
        },
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {}
        },
        extraCssText: 'width: 170px'
      },
      title: {
        left: 'center',
        text: title || '',
        subtext: subText || ''
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisPointer: {
            snap: true
          },
          data: data.map((item) => new Date(item[0]).toLocaleTimeString())
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            inside: true
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: '10分钟互动人数',
          type: 'line',
          stack: 'Total',
          emphasis: {
            focus: 'series'
          },
          showSymbol: false,
          smooth: true,
          areaStyle: {},
          data: data.map((item) => item[1])
        },
        {
          name: 'B站高能榜',
          type: 'line',
          stack: 'Total',
          emphasis: {
            focus: 'series'
          },
          showSymbol: false,
          smooth: true,
          areaStyle: {},
          data: data.map((item) => item[2] || 0)
        }
      ]
    }
  })
}

export default useEcharts
