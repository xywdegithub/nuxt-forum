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
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
     { src: '@/plugins/route.js', ssr: false }
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
  router: {
    extendRoutes(routes, resolve) {
       routes.length = 0 
      routes.push({
        path: "/login",
        component: resolve(__dirname,'pages/login.vue'),
        name: "login"
      }, {
        path: "/register",
        component: resolve(__dirname,'pages/register.vue'),
        name: "register"
      }, {
        path: "/",
        component: resolve(__dirname,'pages/index.vue'),
        name: "index",
        children: [{
          path: "details",
          component:resolve(__dirname,'pages/index/details.vue'),
          name: "index-details"
        }, {
          path: "msg",
          component:resolve(__dirname,'pages/index/msg.vue'),
          name: "index-msg",
          meta:{
            requireAuth:true
          }
        }, {
          path: "personCenter",
          component:resolve(__dirname,'pages/index/personCenter.vue'),
          meta:{
            requireAuth:true
          },
          children: [{
            path: "",
            component:resolve(__dirname,'pages/index/personCenter/index.vue'),
            name: "index-personCenter",
            meta:{
                requireAuth:true
              }
          }, {
            path: "income",
            component:resolve(__dirname,'pages/index/personCenter/income.vue'),
            name: "index-personCenter-income",
            meta:{
                requireAuth:true
              }
          }, {
            path: "mine",
            component:resolve(__dirname,'pages/index/personCenter/mine.vue'),
            name: "index-personCenter-mine",
            meta:{
                requireAuth:true
              }
          }]
        }, {
          path: "post",
          component:resolve(__dirname,'pages/index/post.vue'),
          name: "index-post",
          meta:{
            requireAuth:true
          }
        }, {
          path: "search",
          component:resolve(__dirname,'pages/index/search.vue'),
          name: "index-search"
        }, {
          path: ":categoryId?",
          component:resolve(__dirname,'pages/index/_categoryId.vue'),
          name: "index-categoryId"
        }]
      })
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
