<template lang='pug'>
.vce-print
  PrintPreview

</template>

<script>
// import moment from 'moment'
import { mapMutations } from 'vuex'

export default {
  components: {
    PrintPreview: () => import('@c/print/print-preview.vue'),
  },
  data() {
    return {
      initData: {
        'name': '桜一郎',
        'section': 'システム事業部',
        'date': '2019-07-25',
        'id': 'cdde1844-bfc8-4246-a956-b803a306b271',
        'created': '2019-07-25 14:13:08',
        'tables': [
          {
            'id': 'b9db82ec-47d1-4e22-be56-171a21d255c5',
            'date': '2019-07-01T04:56:00.000Z',
            'name': '阪急',
            'start_spot': '高槻市',
            'end_spot': '西院',
            'roundtrip': [
              null
            ],
            'notes': null,
            'price': '500'
          },
          {
            'id': 'a355e13c-f945-4e7d-88fa-0925c3a25381',
            'date': '2019-07-02T04:56:00.000Z',
            'name': '大阪地下鉄',
            'start_spot': '西大橋',
            'end_spot': '難波',
            'roundtrip': [],
            'notes': null,
            'price': '300'
          },
          {
            'id': 'f9855536-d222-4fc9-9e12-888dec33fe00',
            'date': '2019-07-03T04:56:00.000Z',
            'name': '近鉄',
            'start_spot': '京都',
            'end_spot': '奈良',
            'roundtrip': [
              null
            ],
            'notes': null,
            'price': '700'
          },
          {
            'id': 'db24e567-b35d-4de6-8294-e4e923f07cd9',
            'date': null,
            'name': null,
            'start_spot': null,
            'end_spot': null,
            'roundtrip': [],
            'notes': null,
            'price': 0
          },
          {
            'id': '5e768e12-c07b-4970-bc17-9e93e9f6e81b',
            'date': null,
            'name': null,
            'start_spot': null,
            'end_spot': null,
            'roundtrip': [],
            'notes': null,
            'price': 0
          }
        ]
      }
    }
  },
  mounted() {
    this.GET_FORM(this.initData)
  },
  methods: {
    ...mapMutations('save', [
      'GET_FORM'
    ])
  }
}
</script>


<style lang='sass' scoped>
@import './print-index.sass'
</style>
