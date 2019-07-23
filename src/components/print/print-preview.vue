<template lang='pug'>
.v-print-preview
  .v-print-body.box
    div(v-if="form")
      .title.is-3.has-text-centered 交通費精算伝票

      .columns
        .column.is-6
          table.table.is-fullwidth
            colgroup
              col(width="80")
              col
            tbody
              tr.is-middle
                th 氏名
                td
                  div.is-size-6 {{ form.name }}
              tr.is-middle
                th 所属
                td
                  div.is-size-6 {{ form.section }}
              tr.is-middle
                th 申請日
                td
                  div.is-size-6 {{ setDate(form.date) }}
        .column.is-3
        .column.is-3

          table.table.is-bordered.is-fullwidth
            tbody
              tr
                td.has-text-centered 受領印（日付）
              tr
                td
                  br
                  br
                  br

      .field
        .control 以下のとおり、交通費の申請をいたします。
      table.table.is-bordered.is-fullwidth
        colgroup
          col(width="15%")
          col(width="1%")
          col
          col(width="1%")
          col(width="1%")
          col
        thead
          tr.is-middle
            th(nowrap) 利用日
            th(nowrap)
              div 交通機関
              .is-size-7 （駐輪場・駐車場等含む）
            th 利用区間
            th(nowrap)
              div 往復
            th(nowrap)
              div 備考
              .is-size-7 （領収書の有無）
            th 利用金額

        tbody
          template(v-if="$route.query.frame_only")
            tr(v-for="n in 25")
              td
              td
              td
              td
              td
              td
                br
          template(v-else)
            tr.is-middle(
              v-for="i in form.tables"
            )
              td(nowrap) {{ setDate(i.date) }}
              td {{ i.name }}
              td
                div(v-if="i.start_spot || i.end_spot")
                  | {{ i.start_spot }} 〜 {{ i.end_spot }}
              td
                .has-text-centered(v-if="i.roundtrip.length")
                  i.material-icons done
              td
                VueMarkdown {{ i.notes }}
              td.has-text-right
                template(v-if="i.price && i.price > 0")
                  div(v-if="i.roundtrip.length") {{ price(i.price * 2) }}
                  div(v-else) {{ price(i.price) }}
                template(v-else)
                  br

      .columns
        .column.is-4
        .column.is-4
        .column.is-4
          table.table.is-fullwidth
            colgroup
              col(width="80")
              col
            tbody
              tr.is-middle
                th 合計
                td.has-text-right
                  template(v-if="!$route.query.frame_only")
                    div(v-if="total()")
                      .title.is-5
                        | {{ total() }}
                        span.is-size-7 円
              tr.is-middle
                th
                td
              //- tr.is-middle
              //-   th 申請日
              //-   td
              //-     div.is-size-6 {{ setDate(form.date) }}

      //- p ※駐輪場・駐車場等の領収書をお持ちの方は裏面に貼り付けてください。

</template>
<script>
import commaNumber from 'comma-number'
import {mapState} from 'vuex'
import _ from 'lodash'
export default {
  components: {
    VueMarkdown: () => import('vue-markdown'),
  },
  computed: {
    ...mapState('save', [
      'form',
      'setForm',
    ]),
  },
  methods: {
    setDate(d) {
      if (!d) return
      return this.$moment(d).format('YYYY/MM/DD')
    },
    price(n) {
      return commaNumber(n)
    },
    total() {
      try {
        let all = []
        _.map(this.form.tables, i => {
          all.push(i.price * (i.roundtrip.length +1 ))
        })
        let sum = _.sum(all)
        console.log(sum)
        if ( sum > 0 ) {
          return commaNumber(sum)
        } else {
          return null
        }
      } catch (error) {
        console.log({error})
        return null
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
    max-height: 1130px
    overflow: hidden
    margin: 0 auto

    table.table
      td, th
        border-color: #000
        min-height: 1em

      thead, tbody, tfoot
        tr
          td, th
            padding: 3px 14px

      &.is-bordered
        > thead
          th
            background-color: #fff
            font-weight: 500

  // &-foot
  //   padding-top: 30px
</style>
