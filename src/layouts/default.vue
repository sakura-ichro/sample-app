<template lang="pug">
.v-layout
  .v-layout-header
    .hero.is-link.is-small
      .hero-body
        h1.has-text-centered.title.is-3 SAMPLE-APP

  .v-layout-content
    .container
      .tabs.is-centered.is-medium
        ul
          li(
            v-for="i in menus"
            :class="isActive(i.id)"
          )
            nuxt-link(:to="{name: i.id}") {{ i.name }}
      nuxt

</template>

<script>
export default {
  data() {
    return {
      menus: [
        {id: 'index', name: 'スプレッドシート'},
        {id: 'print', name: '帳票'},
        {id: 'chart', name: 'チャート'},
      ]
    }
  },
  methods: {
    isActive(key) {
      let includes = () => {
        let reg = new RegExp(`^${key}`)
        if ( this.$route.name.match(reg) ) {
          return true
        }
      }
      switch (true) {
        case includes():
          return 'is-active'
        default:
          return false
      }
    }
  }
}
</script>


<style lang='sass' scoped>
.v-layout
  &-header
    +print
      display: none

  &-content
    padding: 40px 0
    +print
      padding: 0

    .tabs
      margin-bottom: 30px
      a
        font-weight: bold

      +print
        display: none
</style>
