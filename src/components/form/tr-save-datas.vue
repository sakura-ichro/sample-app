<template lang='pug'>
tr.is-middle
  td(nowrap) セーブデータ_{{ save_id }}
  td
    mixin dl_table(opts)
      .tile(class=opts.cls)
        .c-dl-table
          dl
            dt
              label #{opts.name}
            dd
              block
    div(v-if="savedata")
      .tile.mb-5
        +dl_table({name: '作成者', cls: 'is-4'})
          | {{ setName(savedata.name) }}
        +dl_table({name: '所属', cls: 'is-4'})
          | {{ setName(savedata.section) }}
      .tile
        +dl_table({name: '作成日時', cls: 'is-12'})
          | {{ savedata.created }}

    .has-text-grey-light(v-else) データはありません
  td
    a.button.is-primary.hvr-grow(
      :class="loading"
      @click="saveData(save_id)"
    )
      strong データ{{ save_id }}に保存する

</template>
<script>
import sleep from 'sleep-promise'
import { mapActions, mapMutations } from 'vuex'

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
  methods: {
    ...mapActions('save', [
      'SAVE',
    ]),
    ...mapMutations('save', [
      'MODAL_SAVE',
    ]),
    modalClose() {
      this.MODAL_SAVE(false)
    },
    async saveData(key) {
      this.loading = 'is-loading'
      await sleep(800)
      this.SAVE(key)
      this.loading = null
      await sleep(200)
      this.modalClose()
    },
    setName(val) {
      if (val) {
        return val
      } else {
        return '----'
      }
    }
  }
}
</script>
<style lang='sass' scoped>
.table
  td
    .button
      min-width: 160px
</style>
