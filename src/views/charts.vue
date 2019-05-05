<template lang="pug">
	.charts
		ui-box()
			.text-item x
			.text-item x
			.text-item x
		ui-box()
			g2-bar(
				:chartData="data"
				:dimension="dimension"
				:measure="measure"
				:key="1"
			)
			g2-bar(
				:chartData="data"
				:dimension="dimension"
				:measure="measure"
				:key="2"
			)
			g2-bar(
				:chartData="data"
				:dimension="dimension"
				:measure="measure"
				:key="3"
			)
			.text-item xxx
</template>

<script>
	import axios from 'axios'
	import G2Bar from '../../packages/chart/g2-bar'

	export default {
		name: 'charts',
		components: { G2Bar },
		data () {
			return {
				data: [],
				dimension: 'name',
				measure: ['value']
			}
		},
		mounted () {
			this.load()
		},
		methods: {
			load () {
				axios.post('/geely-dataview/borad/charts')
					.then(response => {
						this.data = response.data.data.list
					})
			}
		}
	}
</script>
<style>
	.text-item {
		flex: auto;
	}
</style>
