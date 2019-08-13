<template lang='pug'>
	.chart.g2-point(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>

<script>
	import { DataSet } from '@antv/data-set'
	import G2Serie from './base/g2-serie'
	import G2 from '@antv/g2'
	const ds = new DataSet()
	export default {
		name: 'g2-point',
		extends: G2Serie,
		props: {
			legend: {
				type: String,
				default: ''
			},
			line: {
				type: Array,
				default: function () {
					return []
				}
			}
		},
		mounted () {
			this.drawChart()
		},
		watch: {},
		methods: {
			drawChart () {
				this.chart && this.chart.clear()
				this.dv = ds.createView()
					.source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				this.chart.tooltip({
					showTitle: false
				})
				let dimension = this.dimension[0]
				let measure = this.measure[0]
				let legend = this.legend
				let z = this.line[0]
				this.chart.source(this.dv)
				this.chart.legend(legend, {
					position: 'right-top',
					layout: 'vertical'
					})
				this.chart.point()
					.position(`${dimension}*${measure}`)
					.size(z || 5, [5, 20])
					.shape('circle')
					.opacity(0.65)
					.color(legend)
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
