'use strict'

// ------------------------------
export const state = () => ({
  loading: false,
  modal_save: false,
  modal_load: false,
  form: null,
  setForm: null,
  savedatas: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
  },
})

// ------------------------------
export const getters = {}

// ------------------------------
export const mutations = {
  SAVE(state, {key, savedata}) {
    state.savedatas[key] = savedata
    let savedatas = {...state.savedatas}
    savedatas = JSON.stringify(savedatas)
    localStorage.setItem('savedatas', savedatas)
  },

  LOAD(state, res) {
    state.savedatas = res
  },

  DELETE(state, key) {
    state.savedatas[key] = null
    let savedatas = {...state.savedatas}
    savedatas = JSON.stringify(savedatas)
    localStorage.setItem('savedatas', savedatas)
  },

  LOADING(state, res) {
    state.loading = res
  },

  SET_FORM(state, key) {
    state.setForm = {...state.savedatas[key]}
    state.form = state.setForm
  },

  GET_FORM(state, res) {
    state.form = res
  },

  MODAL_SAVE(state, res) {
    state.modal_save = res
  },
  MODAL_LOAD(state, res) {
    state.modal_load = res
  }
}

// ------------------------------
export const actions = {
  async SAVE({commit, state}, key) {
    try {
      commit('LOADING', 'is-loading')
      commit('SAVE', {
        key,
        savedata: state.form
      })
    } catch (error) {
      commit('LOADING', false)
      alert('不明なエラー')
      console.log({error})
    }
  },

  async LOAD({commit}) {
    try {
      if ( localStorage.getItem('savedatas') ) {
        let savedatas = localStorage.getItem('savedatas')
        savedatas = JSON.parse(savedatas)
        commit('LOAD', savedatas)
      }
    } catch (error) {
      alert('不明なエラー')
      console.log({error})
    }
  },
}

