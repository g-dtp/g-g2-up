<template lang="pug">
	.charts
		dv-edit(v-for="widget,index in root" :tabindex='index' :key="widget.id" :widget="widget")
</template>

<script>
	import axios from 'axios'
	import {DvBox, DvEdit} from 'packages/index'

	export default {
		name: 'charts',
		components: {DvBox, DvEdit},
		provide: {
			axios: axios,
			url: '/geely-dataview/borad/charts',
			layout: 'absolute',
			store: {}
		},
		data() {
			return {
				data: [],
				dimension: 'name',
				measure: ['value'],
				root: [{
					grid: {x: 0, y: 0, width: 20, height: 20, zIndex: null},
					category: 1,
					type: '102',
					typeName: 'ui-tooltip',
					data: {
						content: '我得试试'
					}
				}, {
					category: 0,
					grid: {x: 0, y: 0, width: 380, height: 280, zIndex: null},
					id: 12934,
					title: '未命名图表',
					type: '1040',
					typeName: 'g2-pie',
					uid: 'uid-1556605339779-2',
					data: {
						content: '',
						dimension: [{meta: 'name'}],
						legend: [],
						measure: [{meta: 'value'}]
					}
				}, {
					category: 0,
					grid: { x: 0, y: 0, width: 380, height: 280, zIndex: null },
					id: 1290,
					title: '未命名图表',
					type: '1090',
					typeName: 'g2-tag-cloud',
					uid: 'uid-1556605339779-2',
					data: {
						content: '',
						dimension: [{meta: 'name'}],
						legend: [],
						measure: [{meta: 'value'}]
					}
				}]
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				axios.post('/geely-dataview/borad/charts')
					.then(response => {
						this.data = response.data.data
					})
			}
		}
	}
</script>
<style>
</style>
