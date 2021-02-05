export default {
  mode:'universal',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-forum',
    // htmlAttrs: {
    //   lang: 'en'
    // },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      {hid: 'icon', rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://at.alicdn.com/t/font_1990924_xhbbztpo3um.css'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    'assets/css/base.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    // {
    //   src: '@/plugins/vue-quill-editor',
    //   ssr: false
    // }
    //    { src: '@/plugins/wangEditor', ssr: false },
    //  { src: '@/plugins/route.js', ssr: false }
  ],
   vendor: ['wangeditor'],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'js-cookie',
    'cookieparser'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
