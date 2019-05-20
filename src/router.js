import Vue from 'vue'
import Router from 'vue-router'
import Charts from './views/charts.vue'
import Move from './views/move.vue'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'charts',
			component: Charts
		},
		{
			path: '/move',
			name: 'move',
			component: Move
		},
		{
			path: '/ui',
			name: 'ui',
			component: () => import('@/views/ui.vue')
		},
		{
			path: '/auto',
			name: 'auto',
			component: () => import('@/views/auto.vue')
		}
	]
})
