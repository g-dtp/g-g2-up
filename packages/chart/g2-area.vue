<template lang='pug'>
	.chart.g2-line(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>
<script>
	import { DataSet } from '@antv/data-set'
	import G2Serie from './base/g2-serie'

	const ds = new DataSet()
	export default {
		extends: G2Serie,
		name: 'g2-area',
		props: {
			measure: {
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
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				this.dv.transform(this.getTransformFold())
				this.chart.source(this.dv)
				this.chart.scale(this.dimension, { range: [0, 1] })
				this.chart.line().position(`${this.dimension}*value`).color('type').size(2)
				this.chart.area().position(`${this.dimension}*value`).color('type').opacity(0.5)
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
