<template lang='pug'>
.vce-print
  PrintPreview

</template>

<script>
// import moment from 'moment'
import { mapMutations } from 'vuex'
import _ from 'lodash'
import axios from 'axios'

export default {
  components: {
    PrintPreview: () => import('@c/print/print-depositList.vue'),
  },
  data(){
    return {
      initData:{
        tables: []
      }
    }
  },
  mounted() {
    let n = this.$route.query.n
    if(n == null || !_.isFinite(Number(n))){ n = 10 }
    //ダミーデータをサーバサイドから取得
    this.getDummyData(Number(n))
  },
  methods: {
    ...mapMutations('save', [
      'GET_FORM'
    ]),
    getDummyData(n){
      axios.get('http://localhost:5000/node-api/fake?q=user&n=' + n).then((response) => {
        _.forEach(response.data.items, (value) => {
          let paymentPrice = this.getRandamNumber(5000, 9500)
          value.type = '済'
          value.payDate = '平成30年12月31日'
          value.billingPrice = 9500
          value.paymentPrice = paymentPrice
          value.paymentLeftPrice = 9500 - paymentPrice
        })
        let paymentLeftNumber = this.getRandamNumber(0, 2)
        let payNotFinishNumber = this.getRandamNumber(0, 1)
        let target = _.merge({tables: response.data.items}, {
          className: 'テストクラス',
          tanto: '担当者A',
          payment_type: '',
          dataMonth:'平成30年5月',
          outputDate:'2019-01-05',
          payFinish:response.data.items.length - paymentLeftNumber - payNotFinishNumber,
          payLeft:paymentLeftNumber,
          payNotFinish:payNotFinishNumber,
          paymentCount:response.data.items.length,
          sumOfBilling:99950,
          sumOfPayment:93450,
          sumOfLeftPayment:6500
        })
        this.GET_FORM(target)
      })
    },
    getRandamNumber(min, max){
      if(min == null){
        min = 0
      }
      if(max == null){
        max = 100
      }
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

  }
}
</script>


<style lang='sass' scoped>
@import './print-index.sass'
</style>
