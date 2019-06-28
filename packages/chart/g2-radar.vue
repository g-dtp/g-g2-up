<template lang='pug'>
	.chart.g2-radar(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>
<script>
	import { DataSet } from '@antv/data-set'
	import G2Serie from './base/g2-serie'

	const ds = new DataSet()

	export default {
		extends: G2Serie,
		name: 'g2-radar',
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
				this.chart.coord('polar')
				let dimension = this.dimension
				this.dv = ds.createView()
					.source(this.chartData)
					.transform(this.getTransformMapNull())
					.transform({
						type: 'fold',
						fields: this.measure,
						key: 'type',
						value: 'value'
					})
				this.chart.source(this.dv)
				this.chart.line().position(`${dimension}*value`).color('type')
				this.chart.point().position(`${dimension}*value`).color('type').size(4).shape('circle')
				this.chart.render()
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
