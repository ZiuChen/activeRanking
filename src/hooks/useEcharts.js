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
          return [pt[0], '10%']
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
      xAxis: {
        type: 'time',
        boundaryGap: false,
        axisPointer: {
          snap: true
        }
      },
      yAxis: {
        type: 'value',
        axisTick: {
          inside: true
        }
      },
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
          name: '互动人数',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          areaStyle: {},
          data: data
        }
      ]
    }
  })
}

export default useEcharts
