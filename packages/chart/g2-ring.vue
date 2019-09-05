<template lang='pug'>
	.chart.g2-ring(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>
<script>
	import {DataSet} from '@antv/data-set'
	import G2Serie from './base/g2-serie'
	import {toFixed2, toFixed} from './formatter'

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
		mounted() {
			this.drawChart()
		},
		watch: {},
		methods: {
			drawChart() {
				this.chart && this.chart.clear()
				this.chart.coord('theta', {
					innerRadius: 0.6 / 1,
					radius: 1
				})
				this.chart.tooltip({
					showTitle: false
				})
				this.dv = ds.createView()
					.source(this.chartData)
					.transform(this.getTransformMapNull())
				let dimension = this.dimension[0]
				if (dimension && this.measure.length === 0) {
					this.dv.transform({
						type: 'map',
						callback(row) {
							row.count = 1
							return row
						}
					})
					this.chart.source(this.dv)
					this.chart.intervalStack().position('count').color(dimension)
				} else {
					this.dv.transform({
						type: 'fold',
						fields: this.measure,
						dimension: dimension,
						key: 'type',
						value: 'value'
					})
					this.dv.transform({
						type: 'aggregate',
						fields: 'value',
						operations: ['sum'],
						as: ['total'],
						groupBy: [dimension]
					})
					this.dv.transform({
						type: 'percent',
						field: 'total',
						dimension: dimension,
						as: 'percent'
					})
					this.chart.source(this.dv)
					this.chart.intervalStack()
						.position('percent')
						.color(dimension)
						.label(dimension + '*percent', (label, percent) => {
							if (percent > 0.05) {
								return toFixed2(percent)
							} else {
								return ''
							}
						}, {
							offset: -10,
							textStyle: {
								fill: '#ffffff',
								fontSize: 12,
								shadowBlur: 2,
								shadowColor: 'rgba(0, 0, 0, 1)'
							}
						})
						.tooltip(dimension + '*percent', function (item, percent) {
							return {
								name: item,
								value: toFixed2(percent)
							}
						})
					let max = this.dv.rows[0]
					this.chart.guide().html({
						position: ['50%', '50%'],
						html: '<div class="g2-ring-guide-html"><p class="title">' + max[dimension] + '</p><p class="value">' + max.value + '</p></div>'
					})
				}

				this.chart.render()
			}
		}
	}
</script>
<style lang="scss">
	.g2-ring-guide-html {
		text-align: center;

		p {
			margin: 0;
		}

		.title {
			font-size: 12px;
			color: #8c8c8c;
			font-weight: 300;
		}

		.value {
			margin-top: 8px;
			font-size: 28px;
			color: #000;
		}
	}
</style>
<style lang="scss" scoped>
	.chart {
		position: relative;
	}
</style>
