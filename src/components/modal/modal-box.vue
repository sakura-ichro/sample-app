<template lang='pug'>
.c-modal
  transition(name="fade")
    .modal(v-if="show" :class="isActive()")
      .modal-background(@click="close()")
      .modal-card(:class="classes")
        header.modal-card-head
          p.modal-card-title(:class="titleClass") {{ title }}
          button.delete.is-medium.hvr-grow(@click="close()")
        section.modal-card-body.is-visible
          slot(name="body")

        footer.modal-card-foot
          slot(name="footer")

</template>
<script>

export default {
  props: {
    title: {
      type: String,
      default: 'モーダルタイトル'
    },
    titleClass: null,
    show: null,
    classes: {
      type: String,
      default: 'is-visible'
    },
    close: {
      type: Function,
      default() {
        this.modalClose()
      }
    }
  },
  watch: {
    show(bool) {
      if (bool) {
        document.querySelector('html')
        .classList.add('is-modal-active')
      } else {
        document.querySelector('html')
        .classList.remove('is-modal-active')
      }
    }
  },
  methods: {
    isActive() {
      if ( this.show ) {
        return 'is-active'
      }
    },
    modalClose() {
      alert('modalClose')
    },
  }
}
</script>

<style lang='sass'>
@import './modal-box.sass'
</style>
