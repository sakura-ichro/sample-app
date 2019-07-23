<template lang='pug'>
tr.is-middle(v-if="form")
  td
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

  td
    input.input(v-model="form.name")
  td
    .field.is-grouped.is-middle
      .control 出発
      .control
        input.input(v-model="form.start_spot")
    .field.is-grouped.is-middle
      .control 到着
      .control
        input.input(v-model="form.end_spot")
  td
    .field
      input.is-checkradio(
        v-model="form.roundtrip"
        :id="`roundtrip-${form.id}`"
        type="checkbox"
      )
      label(:for="`roundtrip-${form.id}`")
        span 往復
  td
    textarea.textarea(
      v-model="form.notes"
      :style="{'min-height': '5em'}"
    )
  td
    .field
      input.input(
        v-model="form.price"
      )
    div(v-if="form.roundtrip.length")
      label.label 往復: {{ form.price * 2 }}

  td
    a.has-text-danger.hvr-grow(
      @click="deleteData()"
    )
      i.material-icons backspace
</template>
<script>
// import _ from 'lodash'
// import uuid from 'uuid'
export default {
  components: {
    DatePicker: () => import('vuejs-datepicker')
  },
  props: {
    form: null,
    uid: null
  },
  // data() {
  //   return {
  //     form: {
  //       date: null,
  //       name: null,
  //       start_spot: null,
  //       end_spot: null,
  //       roundtrip: [],
  //       notes: null,
  //       price: 0,
  //     }
  //   }
  // },
  methods: {
    deleteData() {
      if ( confirm('項目を削除しますか?') ) {
        // this.$parent.tables = _.filter(
        //   this.$parent.tables, i => i !== this.uid
        // )
        this.$parent.updateTable(this.uid)
        // this.form = _.filter(
        //   this.form, i => i !== this.uid
        // )
      }
    }
  }
}
</script>
<style lang='sass'></style>
