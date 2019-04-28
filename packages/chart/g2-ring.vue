<template lang='pug'>
	.chart.g2-ring(:style="style")
</template>
<script>
	import { DataSet } from '@antv/data-set'
	import G2Serie from './base/g2-serie'

	const ds = new DataSet()
	export default {
		extends: G2Serie,
		name: 'g2-ring',
		props: {
			coordType: {
				type: String,
				default: 'rect'
			}
		},
		mounted () {
			this.drawChart()
		},
		watch: {},
		methods: {
			drawChart () {
				this.chart && this.chart.clear()
				this.chart.coord('theta', { innerRadius: 0.75 })
				this.dv = ds.createView()
					.source(this.chartData)
					.transform(this.getTransformMapNull())
					.transform({
						type: 'fold',
						fields: this.measure,
						dimension: this.dimension,
						key: 'type',
						value: 'value'
					})
				this.chart.source(this.dv)
				this.chart.intervalStack().position('value').color(this.dimension)
				this.chart.render()
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
