<template lang='pug'>
div
  .v-calendar
    .v-calendar-input
      slot

    .v-calendar-body
      Datepicker(
        input-class="input"
        :language="locale"
        format="yyyy年M月d日"
        :clear-button="true"
      )

</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { ja } from 'vuejs-datepicker/dist/locale'
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      locale: ja
    }
  }
}
</script>
<style lang='sass' scoped>
.v-calendar

  &-input

</style>
