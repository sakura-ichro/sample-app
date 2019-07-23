<template lang='pug'>
tr.is-middle(v-if="savedata")
  td(nowrap) セーブデータ_{{ save_id }}
  td
    mixin dl_table(opts)
      dl
        dt
          label #{opts.name}
        dd
          block
    div(v-if="savedata")
      .c-dl-table
        +dl_table({name: '作成者', cls: 'is-4'})
          | {{ setName(savedata.name) }}
        +dl_table({name: '所属', cls: 'is-4'})
          | {{ setName(savedata.section) }}
        +dl_table({name: '作成日時', cls: 'is-12'})
          | {{ savedata.created }}
  td
    a.button.is-link(
      @click="loadData(save_id)"
      :class="loading"
    ) このデータをロード
  td
    a.has-text-danger.hvr-grow(
      @click="deleteData(save_id)"
    )
      i.material-icons backspace

tr.is-middle(v-else)
  td(nowrap) セーブデータ_{{ save_id }}
  td
    .has-text-grey-light データはありません
  td
  td

</template>
<script>
// import _ from 'lodash'
// import uuid from 'uuid'
// import moment from 'moment'
import sleep from 'sleep-promise'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      loading: null,
    }
  },
  props: {
    save_id: null,
    savedata: null,
  },
  computed: {
    ...mapState('save', [
      'modal_load',
      'savedatas'
    ])
  },
  methods: {
    ...mapMutations('save', [
      'SET_FORM',
      'DELETE',
      'MODAL_LOAD',
    ]),
    async deleteData(key) {
      try {
        if ( confirm('データを削除しますか?') ) {
          this.DELETE(key)
        }
      } catch (error) {
        alert('不明なエラー')
        console.error({error})
      }

    },
    async loadData(key) {
      this.loading = 'is-loading'
      await sleep(1000)
      this.SET_FORM(key)
      this.loading = null
      this.modalClose()
    },
    modalClose() {
      this.MODAL_LOAD(false)
    },
    setName(val) {
      if (val) { return val
      } else { return '----' }
    }
  }
}
</script>
<style lang='sass'></style>
