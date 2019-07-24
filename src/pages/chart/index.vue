<template lang='pug'>
div
  .title.is-3.has-text-centered チャートサンプル
  .box
    .field.mb-30
      line-chart(
        :chartData="lineData"
        :styles="styles"
        :options="lineOpts()"
      )
    .buttons.is-centered
      .button.is-primary.is-large(@click="fillData()") 再登録

  .box
    .field.mb-30
      pie-chart(
        :chartData="pieData"
        :styles="styles"
        :options="pieOpts()"
      )
    .buttons.is-centered
      .button.is-primary.is-large(@click="fillData()") 再登録
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    LineChart: () => import('@c/chart/LineChart'),
    PieChart: () => import('@c/chart/PieChart'),
  },
  computed: {
    ...mapState('colors', ['colors']),
    ...mapGetters('colors', ['hex2rgb']),
    styles() {
      return {
        height: `${this.height}px`,
        position: 'relative',
      }
    }
  },
  data () {
    return {
      height: 500,
      lineData: {},
      pieData: {},
      options: this.lineOpts()
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.lineData = {
        labels: this.setLabels(),
        datasets: [
          {
            label: '体重',
            borderColor: this.rgba('info', 0.8),
            backgroundColor: this.rgba('info', 0.3),
            // fill: false,
            yAxisID: 'y-axis-weight',
            data: this.randomWeight(),
          },
          {
            label: '身長',
            borderColor: this.rgba('primary', 0.8),
            backgroundColor: this.rgba('primary', 0.3),
            // fill: false,
            yAxisID: 'y-axis-height',
            data: this.randomHeight(),
          },
        ]
      }

      this.pieData = {
        labels: ['出席', '欠席', '未登録'],
        datasets: [{
          data: [
            _.random(5, 100),
            _.random(5, 100),
            _.random(5, 100),
          ],
          borderColor: [
            this.rgba('success', 1),
            this.rgba('info', 1),
            this.rgba('primary', 1),
          ],
          backgroundColor: [
            this.rgba('success', 1),
            this.rgba('info', 1),
            this.rgba('primary', 1),
          ],
        }]
      }
    },
    setLabels() {
      let labels = []
      _.times(12, n => {
        labels.push(`${n+1}月`)
      })
      return labels
    },
    randomHeight () {
      let arr = []
      _.times(12, () => {
        arr.push(_.random(100, 160))
      })
      return arr
    },
    randomWeight () {
      let arr = []
      _.times(12, () => {
        arr.push(_.random(15, 70))
      })
      return arr
    },
    rgba(key, val) {
      try {
        let rgb = this.hex2rgb(this.colors[key])
        return `rgba(${rgb}, ${val})`
      } catch (error) {
        return '#fff'
      }
    },
    pieOpts() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      }
    },
    lineOpts() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              // stacked: true,
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-weight',
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                callback(label) {
                  return `${label}kg`
                },
              },
            },
            {
              // stacked: true,
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-height',
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 200,
                // callback(label, index, labels) {
                callback(label) {
                  return `${label}cm`
                },
              },
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
          ],
        },
      }
    },
  }
}
</script>
<style lang='sass' scoped>
.small
  // max-width: 480px
  margin: 0 auto

canvas
  height: 480px

</style>
