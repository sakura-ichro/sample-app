<template lang="pug">
.vce-print
  .vce-print-edit
    //- .title.is-3.has-text-centered 交通費請求フォーム

    .columns
      .column.is-4
        label.label 氏名
        input.input(v-model="form.name")
      .column.is-4
        //- label.label 所属セクション
        label.label 所属
        input.input(v-model="form.section")

      .column.is-4
        label.label 申請日
        .field
          .control.has-icons-left
            DatePicker(
              v-model="form.date"
              input-class="input"
              format="yyyy/MM/dd"
              :language="$store.state.cmn.locale"
            )
            span.icon.is-left
              i.material-icons.has-text-link date_range

    .level.mb-10
      .level-left
        template(v-if="!$route.query.preview")
          .field.is-grouped.is-middle
            .control
              a.button.is-link.hvr-grow(
                @click="printPreview()"
              ) 印刷プレビュー

        template(v-if="$route.query.preview")
          .field.is-grouped.is-middle
            .control
              a.button(
                @click="gotoEditPage()"
              )
                span.icon.has-text-link
                  i.material-icons keyboard_arrow_left
                span 編集画面に戻る

            .control.mr-20
              a.button.is-link.hvr-grow(
                @click="print()"
              ) 印刷する

            .control
              input.is-checkradio(
                id="is-frame_only"
                v-model="frame_only"
                type="checkbox"
              )
              label(for="is-frame_only")
                span 枠のみ印刷する

      .level-right
        .control
          .field.is-grouped
            .control
              a.button.hvr-grow(
                @click="searchRoute()"
              )
                span.icon.has-text-link
                  i.material-icons search
                span 経路検索

            .control
              a.button.hvr-grow(
                @click="modalOpen('load')"
              )
                span.icon.has-text-link
                  i.material-icons get_app
                span LOAD

            .control
              a.button.is-primary.hvr-grow(
                @click="save()"
                :class="saving"
              )
                span.icon
                  i.material-icons create
                span SAVE

    .field
      .is-size-7.has-text-right ※データはローカルストレージに保存されます


    ModalSaveLoad

    div(v-if="!$route.query.preview")
      table.table.is-fullwidth.is-bordered
        colgroup
          col(width="180")
          col(v-for="n in 4")
          col(width="200")
          col
        thead
          tr.is-middle
            th 利用日
            th
              div 交通機関
              .is-size-7 （駐輪場・駐車場等含む）
            th 利用区間
            th
              div 往復
            th
              div 備考
              .is-size-7 （領収書の有無）
            th 利用金額
            th 削除

        tbody
          FormCost(
            v-for="i in tables"
            :key="i.id"
            :form="i"
            :uid="i.id"
          )

      .buttons.is-right
        a.button.hvr-grow(
          @click="addInvoice()"
        )
          span 項目を追加
          span.icon.has-text-link
            i.material-icons add

  PrintPreview(
    v-if="$route.query.preview"
    :form="form"
    :tables="tables"
  )

</template>

<script>
import _ from 'lodash'
import uuid from 'uuid'
import moment from 'moment'
import sleep from 'sleep-promise'
import { mapActions, mapMutations, mapState } from 'vuex'

let initState = {
  id: null,
  date: null,
  name: null,
  start_spot: null,
  end_spot: null,
  roundtrip: [],
  notes: null,
  price: 0,
}

export default {
  components: {
    DatePicker  : () => import('vuejs-datepicker'),
    ModalSaveLoad    : () => import('@c/modal/modal-save-load'),
    FormCost    : () => import('@c/form/form-cost'),
    PrintPreview: () => import('@c/print/print-preview.vue'),
  },
  computed: {
    ...mapState('save', [
      'setForm',
      'modal_save',
      'modal_load',
    ]),
    ...mapState('print', [
      'preview',
    ]),
    ...mapState('save', {
      'loaddatas': 'savedatas'
    }),

  },
  data() {
    let tables = []
    _.times(5, () => {
      tables.push(
        {...initState, id: uuid('lv4')}
      )
    })
    return {
      form: {
        name: null,
        section: null,
        date: moment().format('YYYY-MM-DD'),
      },
      saving: null,
      printing: null,
      savedatas: [],
      frame_only: [],
      tables,
      modal_type: null
    }
  },
  mounted() {
    this.LOAD()
    window.$store =  this.$store
  },
  watch: {
    async setForm() {
      let savedata = {}
      savedata = {...savedata, ...this.setForm}
      this.form = {
        name: savedata.name,
        section: savedata.section,
        date: savedata.date,
      }
      await sleep(500)
      this.tables = savedata.tables
    },
    frame_only(val) {
      if ( val.length ) {
        let query = {...this.$route.query}
        query.frame_only = 1
        this.$router.push({query})
      } else {
        let query = {...this.$route.query}
        delete query.frame_only
        this.$router.push({query})
      }
    }
  },
  methods: {
    ...mapActions('save', [
      'SAVE',
      'LOAD',
    ]),
    ...mapMutations('save', [
      'MODAL_LOAD',
      'MODAL_SAVE',
      'GET_FORM',
    ]),

    updateTable(uid) {
      this.tables = _.filter(
        this.tables, i => i.id !== uid
      )
    },

    updateForm() {
      let form = {...this.form}
      form.id = uuid('lv1')
      form.created = moment().format('YYYY-MM-DD HH:mm:ss')
      form.tables = [...this.tables]
      this.GET_FORM(form)
    },

    async save() {
      try {
        this.saving = 'is-loading'
        this.updateForm()
        this.saving = null
        this.modalOpen('save')

      } catch (error) {
        this.saving = null
        alert('保存失敗')
      }
    },

    modalOpen(type) {
      switch (type) {
        case 'load':
          this.MODAL_LOAD(true)
          break
        case 'save':
          this.MODAL_SAVE(true)
          break
        default:
          break
      }
    },

    printPreview() {
      this.updateForm()
      let query = {...this.$route.query}
      query.preview = 1
      this.$router.push({ query })
    },

    print() {
      window.print()
    },

    gotoEditPage() {
      this.updateForm()
      let query = {...this.$route.query}
      delete query.preview
      this.$router.push({ query })
    },

    modalLoadClose() {
      this.MODAL_LOAD(false)
    },
    modalSaveClose() {
      this.MODAL_SAVE(false)
    },
    setDate(d) {
      if (d) {
        return moment(d).format('YYYY-MM-DD')
      }
    },

    searchRoute() {
      alert('この機能は準備中です')
    },

    addInvoice() {
      this.tables.push({
        ...initState,
        id: uuid('lv4')
      })
    },

  }
}
</script>


<style lang="sass" scoped>
@import './print-index.sass'
</style>
