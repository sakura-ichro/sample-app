const pkg = require('./package')
let path = require('path')

module.exports = {
  mode: 'spa',
  srcDir: 'src/',

  // Headers of the page
  head: {
    title: 'SAMPLE-APP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,500,700&subset=japanese' }
    ]
  },

  // Customize the progress-bar color
  loading: { color: '#fff' },

  // Plugins to load before mounting the App
  plugins: [
    '@/plugins/moment',
  ],

  // Nuxt.js modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/bulma',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    sass: [
      '~/assets/sass/core.sass'
    ]
  },

  // Global CSS
  css: [
    { src: '~/assets/sass/app.sass', lang: 'sass' }
  ],

  server: {
    port: 3333, // デフォルト: 3000
    host: '0.0.0.0', // デフォルト: localhost
  },

  // manifest: {
  //   name: 'nuxt2-test',
  //   lang: 'ja',
  //   short_name: 'nuxt2-test',
  //   title: 'nuxt2-test',
  //   'og:title': 'nuxt2-test',
  //   description: 'nuxt2-test',
  //   'og:description': 'nuxt2-test',
  //   theme_color: '#ffffff',
  //   background_color: '#ffffff'
  // },

  // Build configuration
  build: {

    extractCSS: true,
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    // You can extend webpack config here
    extend(config, ctx) {
      // alias setting
      config.resolve.alias['@'] = path.join(__dirname, 'src')
      config.resolve.alias['@c'] = path.join(__dirname, 'src/components')
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
}
