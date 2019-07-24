// ------------------------------
export const state = () => ({
  colors: {
    info: '#67C5E0',
    primary: '#FF728B',
    success: '#81D00A',
    warning: '#FF851B',
    danger: '#FF492D',
  },
  loading: null,
})

// ------------------------------
export const getters = {
  colors: state => state.colors,
  rgb: (state, getters) => key => {
    return getters.hex2rgb(state.colors[key])
  },
  hex2rgb: () => hex => {
    if (/^#/.test(hex)) {
      hex = hex.slice(1)
    }
    if (hex.length !== 3 && hex.length !== 6 ) {
      throw new Error('Invaild hex String')
    }

    let digit = hex.split('')

    if (digit.length === 3) {
      digit = [digit[0], digit[0], digit[1], digit[1], digit[2], digit[2]]
    }
    let r = parseInt( [digit[0], digit[1]].join(''), 16 )
    let g = parseInt( [digit[2], digit[3]].join(''), 16 )
    let b = parseInt( [digit[4], digit[5]].join(''), 16 )
    // console.log([r, g, b].join(','));
    return [r, g, b].join(',')
  }
}

// ------------------------------
export const mutations = {
  LOADING(state, res) {
    state.loading = res
  }
}

// ------------------------------
export const actions = {}
