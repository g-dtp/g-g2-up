<template lang="pug">
	.charts
		ui-box()
			g2-area(
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
			ui-box.test(direction="column")
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
					:key="4"
				)
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
		flex-direction: column;
	}
	.test {
		width: 400px;
	}
</style>
