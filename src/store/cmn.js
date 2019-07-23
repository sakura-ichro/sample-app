'use strict'

// import _ from 'lodash'
import { ja } from 'vuejs-datepicker/dist/locale'

// ------------------------------
export const state = () => ({
  loading: false,
  locale: ja,
})

// ------------------------------
export const getters = {
  config: state => state,
  loading: state => state.loading,
  nl2br: () => str => {
    try {
      str = str.replace(/\r\n/g, '<br />')
      str = str.replace(/(\n|\r)/g, '<br />')
      return str
    } catch (error) {
      return str
    }
  },
}



// ------------------------------
export const mutations = {
  LOADING(state, res) {
    state.loading = res
  }
}

// ------------------------------
export const actions = {}
