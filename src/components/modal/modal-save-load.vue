<template lang='pug'>
div
  ModalBox(
    :show="modal_load"
    :close="modalLoadClose"
    classes="is-visible is-large"
    title="セーブデータ一覧"
  )
    template(slot="body")
      .c-modal__scroll
        label.label ロードするデータを選択してください
        table.table.is-fullwidth
          colgroup
            col(width="5%")
            col
            col(width="1%")
            col(width="1%")
          //-   col(width="5%")
          thead
            tr
              th データ名
              th 内容
              th
              th
          tbody
            TrLoadDatas(
              v-for="i,key in loaddatas"
              :save_id="key"
              :savedata="i"
              :key="key"
            )

  ModalBox(
    :show="modal_save"
    :close="modalSaveClose"
    classes="is-visible is-large"
    title="セーブデータ一覧"
  )
    template(slot="body")
      .c-modal__scroll
        label.label 保存先を選択してください
        table.table.is-fullwidth
          colgroup
            col(width="5%")
            col
            col(width="5%")
          thead
            tr
              th データ名
              th 内容
              th
          tbody
            TrSaveDatas(
              v-for="i,key in loaddatas"
              :save_id="key"
              :savedata="i"
              :key="key"
            )
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    ModalBox    : () => import('@c/modal/modal-box'),
    TrSaveDatas : () => import('@c/form/tr-save-datas.vue'),
    TrLoadDatas : () => import('@c/form/tr-load-datas.vue'),
  },
  computed: {
    ...mapState('save', [
      'modal_save',
      'modal_load',
    ]),
    ...mapState('save', {
      'loaddatas': 'savedatas'
    }),
  },
  methods: {
    ...mapMutations('save', [
      'MODAL_LOAD',
      'MODAL_SAVE',
    ]),
    modalLoadClose() {
      this.MODAL_LOAD(false)
    },
    modalSaveClose() {
      this.MODAL_SAVE(false)
    },
  }
}
</script>
<style lang='sass' scoped></style>
