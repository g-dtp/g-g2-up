<template lang="pug">
	.charts
		ui-box
			chart-layout(v-for="i in 3" :widget="widget" :key="i")
		ui-box
			chart-layout(v-for="i in 2" :widget="widget1" :key="i")
		ui-box
			chart-layout(v-for="i in 1" :widget="widget1" :key="i")
</template>

<script>
	import axios from 'axios'
	import { ChartLayout } from 'packages/index'

	export default {
		name: 'charts',
		components: { ChartLayout },
		provide: {
			axios: axios,
			url: '/geely-dataview/borad/charts',
			layout: 'auto'
		},
		data () {
			return {
				data: [],
				dimension: 'name',
				measure: ['value'],
				widget: {
					grid: { x: 0, y: 0, width: 380, height: 280, zIndex: null },
					id: 1290,
					reportDataBaseId: 2777,
					resourceId: 11705319,
					resourceType: 1,
					style: '{showTitle: true}',
					tableId: 0,
					tableName: 'Sheet1',
					title: '未命名图表1556605345413',
					type: '1040',
					typeName: 'g2-pie',
					uid: 'uid-1556605339779-2',
					data: {
						content: '',
						dimension: [{ meta: 'name' }],
						legend: [],
						measure: [{ meta: 'value' }]
					}
				},
				widget1: {
					grid: { x: 0, y: 0, width: 380, height: 280, zIndex: null },
					id: 1290,
					reportDataBaseId: 2777,
					resourceId: 11705319,
					resourceType: 1,
					style: '{showTitle: true}',
					tableId: 0,
					tableName: 'Sheet1',
					title: '未命名图表1556605345413',
					type: '1040',
					typeName: 'g2-bar',
					uid: 'uid-1556605339779-2',
					data: {
						content: '',
						dimension: [{ meta: 'name' }],
						legend: [],
						measure: [{ meta: 'value' }]
					}
				}
			}
		},
		mounted () {
			this.load()
		},
		methods: {
			load () {
				axios.post('/geely-dataview/borad/charts')
					.then(response => {
						this.data = response.data.data
					})
			}
		}
	}
</script>
<style>
	.text-item {
		flex: auto;
		flex-direction: column;
	}

	.test {
		width: 400px;
	}
</style>
