<template lang='pug'>
	.chart.g2-pie(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>
<script>
	import { DataSet } from '@antv/data-set'
	import G2Serie from './base/g2-serie'
	const ds = new DataSet()
	export default {
		extends: G2Serie,
		name: 'g2-pie',
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
				this.chart.coord('theta', {})
				this.dv = ds.createView()
					.source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				this.dv.transform({
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
	.chart {
		position: relative;
	}
</style>
