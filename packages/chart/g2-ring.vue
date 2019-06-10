<template lang='pug'>
	.chart.g2-ring(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>
<script>
	import { DataSet } from '@antv/data-set'
	import G2Serie from './base/g2-serie'
	import { toFixed2 } from './formatter'
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
				this.chart.tooltip({
					showTitle: false
				})
				this.chart.legend(false)
				this.dv = ds.createView()
					.source(this.chartData)
					.transform(this.getTransformMapNull())
				if (this.dimension && this.measure.length === 0) {
					this.dv.transform({
						type: 'map',
						callback(row) {
							row.count = 1
							return row
						}
					})
					this.chart.source(this.dv)
					this.chart.intervalStack().position('count').color(this.dimension)
				} else {
					this.dv.transform({
							type: 'fold',
							fields: this.measure,
							dimension: this.dimension,
							key: 'type',
							value: 'value'
						})
					this.dv.transform({
						type: 'aggregate',
						fields: 'value',
						operations: ['sum'],
						as: ['total'],
						groupBy: [this.dimension]
					})
					this.dv.transform({
						type: 'percent',
						field: 'total',
						dimension: this.dimension,
						as: 'percent'
					})
					this.chart.source(this.dv)
					this.chart.intervalStack()
						.position('percent')
						.color(this.dimension)
						.label(this.dimension + '*percent', (label, percent) => {
							return label + '' + toFixed2(percent)
						})
						.tooltip(this.dimension + '*percent', function(item, percent) {
							return {
								name: item,
								value: toFixed2(percent)
							}
						})
				}
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
