const baseDir = '/kaimono_dentaku/'
const lang = 'ja'
const siteName = '買物電卓'
const shortName = '買物電卓'
const siteDesc = '1gあたりの値段を計算・比較して最安値の商品を割り出します。'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: siteName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: siteDesc,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/kaimono_dentaku/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: 'apple-touch-icon.png',
      },
    ],
  },

  router: {
    base: '/kaimono_dentaku/',
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          'nesting-rules': true,
        },
        autoprefixer: {
          grid: true,
        },
      },
    },
  },

  pwa: {
    icon: {},
    // meta: {
    // mobileAppIOSオプションを有効にする前に、以下記事を一読すること。
    // https://medium.com/@firt/dont-use-ios-web-app-meta-tag-irresponsibly-in-your-progressive-web-apps-85d70f4438cb
    // mobileAppIOS: true
    // },
    manifest: {
      lang,
      name: siteName,
      short_name: shortName,
      description: siteDesc,
      background_color: '#aed265',
      theme_color: '#aed265',
      display: 'standalone',
      orientation: 'portrait',
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://polyfill.io/.*',
          handler: 'cacheFirst',
        },
        {
          urlPattern: '^https://fonts.(?:googleapis|gstatic).com/(.*)',
          handler: 'cacheFirst',
        },
        {
          urlPattern: 'https://cdn.jsdelivr.net/.*',
          handler: 'cacheFirst',
        },
        {
          urlPattern: baseDir + '.*',
          handler: 'staleWhileRevalidate',
          strategyOptions: {
            cacheName: 'my-cache',
            cacheExpiration: {
              maxAgeSeconds: 24 * 60 * 60 * 30,
            },
          },
        },
      ],
    },
  },
}
