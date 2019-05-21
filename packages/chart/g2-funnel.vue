<template lang='pug'>
	.chart.g2-funnel(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>
<script>
	import { DataSet } from '@antv/data-set'
	import G2Serie from './base/g2-serie'

	const ds = new DataSet()

	export default {
		extends: G2Serie,
		name: 'g2-funnel',
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
				if (!this.measure || this.measure.length === 0) return
				let key = this.measure[0]

				this.dv = ds.createView()
					.source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
					.transform({
						type: 'sort-by',
						fields: key,
						order: 'DESC'
					})
				let max = this.dv.rows[0]
				this.dv.transform({
					type: 'map',
					callback: function callback (row) {
						row.percent = row[key] / max[key]
						return row
					}
				})
				this.chart.source(this.dv.rows, {
					percent: {
						nice: false
					}
				})
				this.chart.axis(false)
				this.chart.coord('rect').transpose().scale(1, -1)
				this.chart.intervalSymmetric().position(`${this.dimension}*percent`).shape('funnel').color(this.dimension)
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
