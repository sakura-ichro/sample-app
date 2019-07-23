import axios from 'axios'

// ------------------------------
export const state = () => ({
  ssID: '1edZ3iVy6Xft3WVh3J6qrO8mcdLh5jyM-YObE-PY_qM4',
  baseURL: 'https://spreadsheets.google.com/feeds/cells',
  ids: {
    allergies: 'od6',
  },
  allergies: [],
})

// ------------------------------
export const getters = {}

// ------------------------------
export const mutations = {
  ALLERGIES(state, res) {
    const spread2json = (entry) => {
      let obj = []
      obj['keys'] = []
      obj['data'] = []
      entry.map( (val) => {
        let value = val
        let m, r, c, t
        m = value.id.$t.match(/\/R(\d+)C(\d+)$/)
        r = parseInt(m[1]) - 2
        c = parseInt(m[2]) - 1
        t = value.content.$t
        if( r < 0 ) {
          obj.keys.push(t)
        } else if( c < obj.keys.length  ){
          obj.data[r] = obj.data[r] || {}
          obj.data[r][obj.keys[c]] = t
        }
      })
      // 1行目を除く
      obj.data.shift()
      return obj.data
    }

    state.allergies = spread2json(res.feed.entry)
  }
}

// ------------------------------
export const actions = {
  async ALLERGIES({commit, state}) {
    let {data} = await axios.get(
      `${state.baseURL}/${state.ssID}/${state.ids.allergies}/public/values?alt=json`
    )
    commit('ALLERGIES', data)
  }
}
