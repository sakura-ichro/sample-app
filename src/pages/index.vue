<template lang='pug'>
div
  .title.is-3.has-text-centered アレルギー一覧

  transition(name="fade")
    table.table.is-fullwidth.is-bordered.is-striped(
      v-if="allergies.length"
    )
      colgroup
        col(width="5%")
        col(width="5%")
        col

      thead
        tr
          th ID
          th 食品名
          th 備考
      tbody
        tr(v-for="i in allergies")
          td(nowrap) {{ i.id }}
          td(nowrap) {{ i.name }}
          td
            div(v-html="nl2br(i.notes)")

</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  mounted() {
    this.ALLERGIES()
  },
  computed: {
    ...mapState('sheets', [
      'allergies'
    ]),
    ...mapGetters('cmn', [
      'nl2br',
    ])
  },
  methods: {
    ...mapActions('sheets', [
      'ALLERGIES'
    ])
  }
}
</script>
<style lang='sass' scoped></style>
