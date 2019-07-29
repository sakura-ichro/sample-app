<template lang='pug'>
.v-print-preview
  .v-print-body.box
    div(v-if="form")
      .title.is-12.has-text-centered.is-size-5 入金一覧表
      .columns
        .column.is-4.is-paddingless
          .has-text-left クラス：{{convertEmptyToDefaultValue(form.className, '指定なし')}}
        .column.is-4.is-paddingless
          .has-text-centered {{ form.dataMonth }}
        .column.is-4.is-paddingless
      .columns
        .column.is-4.is-paddingless
          .has-text-left 担当者：{{convertEmptyToDefaultValue(form.tanto, '指定なし')}}
        .column.is-4.is-paddingless
          .has-text-centered 入金区分 {{convertEmptyToDefaultValue(form.payment_type, 'すべて')}}
        .column.is-4.is-paddingless
          .has-text-right 出力日：&nbsp;&nbsp;{{setDate(form.outputDate, 'YYYY年MM月DD日')}}
      table.table.is-bordered.is-fullwidth.is-marginless
        colgroup
          col
          col(width="1%")
          col(width="19%")
          col(width="14%")
          col(width="14%")
          col(width="14%")
        thead
          tr.is-middle
            th(nowrap) 児童名
            th(nowrap) 区分
            th(nowrap) 入金日
            th(nowrap) 請求額
            th(nowrap) 入金金額
            th(nowrap) 入金残額
        tbody
          tr(v-if="i.l_name").is-middle(
            v-for="i in form.tables"
          )
            td.has-text-left {{ i.l_name + ' ' + i.f_kana }}
            td(nowrap).is-padding-large {{ i.type }}
            td.has-text-centered {{ setDate(i.payDate, 'YYYY年MM月DD日') }}
            td(nowrap).has-text-right {{ price(i.billingPrice, true) }}
            td(nowrap).has-text-right {{ price(i.paymentPrice, true) }}
            td(nowrap).has-text-right {{ price(i.paymentLeftPrice, true) }}
          tr(v-if="!form.tables || form.tables.length <= 0")
            td(v-for="n in 6") &nbsp
      table.table.is-bordered.is-fullwidth
        colgroup
          col
          col(width="1%")
          col(width="19%")
          col(width="14%")
          col(width="14%")
          col(width="14%")
        tbody
          tr.is-middle
            td.is-no-border-top.is-paddingless.is-marginless
              table.table.is-fullwidth.is-bordered.is-marginless
                tbody
                  tr.is-middle
                    td(colspan=8).is-no-border-top.is-no-border-left.is-no-border-right.has-text-centered.has-text-weight-semibold 件数
                  tr.is-middle
                    td(nowrap).is-no-border-bottom.is-no-border-left 済
                    td(nowrap).is-no-border-bottom.has-text-weight-semibold {{ form.payFinish }}
                    td(nowrap).is-no-border-bottom 残
                    td(nowrap).is-no-border-bottom.has-text-weight-semibold {{ form.payLeft }}
                    td(nowrap).is-no-border-bottom 未
                    td(nowrap).is-no-border-bottom.has-text-weight-semibold {{ form.payNotFinish }}
                    td(nowrap).is-no-border-bottom 計
                    td(nowrap).is-no-border-bottom.is-no-border-right.has-text-weight-semibold {{ form.paymentCount }}
            td(nowrap).is-no-border-top.has-text-weight-semibold 合計<br />金額
            td(nowrap).is-no-border-top.has-text-centered 
            td(nowrap).is-no-border-top.has-text-right.has-text-weight-semibold {{ totalPrice(form.tables, 'billingPrice') }}
            td(nowrap).is-no-border-top.has-text-right.has-text-weight-semibold {{ totalPrice(form.tables, 'paymentPrice') }}
            td(nowrap).is-no-border-top.has-text-right.has-text-weight-semibold {{ totalPrice(form.tables, 'paymentLeftPrice') }}

</template>
<script>
import commaNumber from 'comma-number'
import {mapState} from 'vuex'
import _ from 'lodash'
export default {
  computed: {
    ...mapState('save', [
      'form',
      'setForm',
    ]),
  },
  methods: {
    setDate(d, dFormat) {
      if (!d){ return }
      if(!dFormat){ dFormat = 'YYYY/MM/DD' }
      try{
        let mDate = this.$moment(d)
        if(mDate.isValid()){
          return mDate.format(dFormat)
        }else{
          if(_.isString(d)){
            return d
          }else{
            return ''
          }
        }
      }catch(e){
        console.log('moment error')
        if(_.isString(d)){
          return d
        }else{
          return ''
        }
      }

    },
    price(n, showOnlyBiggerZero) {
      if(showOnlyBiggerZero){
        if(n <= 0){
          return ''
        }
      }
      return commaNumber(n)
    },
    totalPrice(data, key, showOnlyBiggerZero){
      if(data == null || data.length <= 0 || !key){
        return (showOnlyBiggerZero) ? '' : '0'
      }
      let total = 0
      _.forEach(data, (value) => {
        if(value[key] == null || !_.isFinite(value[key])){
          return ''
        }
        total = total + value[key]
      })
      return this.price(total, showOnlyBiggerZero)
    },
    convertEmptyToDefaultValue(target, defValue){
      if(!target){
        return defValue
      }else{
        return target
      }
    }
  }
}
</script>
<style lang='sass' scoped>
.v-print
  &-preview
    padding: 50px 0
    background-color: #eee
    +rem(1.4)
    +print
      background-color: #fff
      padding: 0

  &-body
    background-color: #fff
    padding: 30px
    border-radius: 0 !important
    width: 800px
    max-width: 800px
    min-height: 1130px
    margin: 0 auto

    table.table
      td, th
        border-color: #000
        min-height: 1em
        &.is-no-border-top
          border-top: none
        &.is-no-border-bottom
          border-bottom: none
        &.is-no-border-left
          border-left: none
        &.is-no-border-right
          border-right: none
      thead, tbody, tfoot
        tr
          td, th
            padding: 3px 3px
            &.is-padding-large
              padding: 3px 10px

      &.is-bordered
        > thead
          th
            background-color: #fff
            font-weight: 500
    div.sumColumns
      padding: 0px
      margin: 0px
    div.sumColumn
      padding: 0px
      margin: 3px
      border: 1px solid #dbdbdb;
  // &-foot
  //   padding-top: 30px
</style>
