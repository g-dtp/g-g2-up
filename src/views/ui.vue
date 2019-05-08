<template lang="pug">
	.ui
		dv-box(v-for="widget,index in root" :key="index" :widget="widget")
</template>

<script>
	import axios from 'axios'
	import { DvBox, DvEdit } from 'packages/index'
	export default {
		name: 'ui',
		provide: {
			axios: axios,
			url: '/geely-dataview/borad/charts',
			layout: 'auto'
		},
		components: { DvBox, DvEdit },
		data () {
			return {
				data: [],
				dimension: 'name',
				measure: ['value'],
				root: [{
					category: 2,
					grid: { x: 0, y: 0, width: 380, height: 280, zIndex: null },
					id: 0,
					type: '104',
					typeName: 'ui-box-h',
					children: [
						{
							category: 2,
							grid: { x: 0, y: 0, width: 380, height: 280, zIndex: null },
							id: 1,
							type: '105',
							typeName: 'ui-box-v',
							children: [
								{
									category: 1,
									type: '102',
									grid: { x: 0, y: 0, width: 380, height: 280, zIndex: null },
									typeName: 'ui-tooltip',
									data: {
										content: '我得试试'
									}
								}
							]
						}, {
							category: 0,
							grid: { x: 0, y: 0, width: 380, height: 280, zIndex: null },
							id: 12934,
							title: '未命名图表',
							type: '1040',
							typeName: 'g2-pie',
							uid: 'uid-1556605339779-2',
							data: {
								content: '',
								dimension: [{ meta: 'name' }],
								legend: [],
								measure: [{ meta: 'value' }]
							}
						}, {
							category: 0,
							grid: { x: 0, y: 0, width: 380, height: 280, zIndex: null },
							id: 1290,
							title: '未命名图表',
							type: '1040',
							typeName: 'g2-pie',
							uid: 'uid-1556605339779-2',
							data: {
								content: '',
								dimension: [{ meta: 'name' }],
								legend: [],
								measure: [{ meta: 'value' }]
							}
						}
					]
				}]
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
<style lang="scss">
	.ui {

	}
</style>
