import Vue from 'vue'
import Router from 'vue-router'
import Charts from './views/charts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'charts',
      component: Charts
    },
    {
      path: '/ui',
      name: 'ui',
      component: () => import('@/views/ui.vue')
    }
  ]
})
