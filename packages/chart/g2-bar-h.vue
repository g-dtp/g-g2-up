<template lang='pug'>
	.chart.g2-bar-h(:style="style")
</template>
<script>
	import G2Serie from './base/g2-serie'
	import { DataSet } from '@antv/data-set'

	const ds = new DataSet()
	export default {
		extends: G2Serie,
		name: 'g2-bar-h',
		props: {
			legend: {
				type: String,
				default: ''
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
				this.chart.coord().transpose()
				if (this.measure.length > 1) {
					this.dv.transform(this.getTransformFold())
					this.chart.source(this.dv)
					this.chart.intervalStack().position(`${this.dimension}*value`).color('type')
				} else {
					this.chart.source(this.dv)
					if (this.legend) {
						this.chart.intervalStack().position(`${this.dimension}*${this.measure[0]}`).color(this.legend)
					} else {
						this.chart.interval().position(`${this.dimension}*${this.measure[0]}`)
					}
				}
				this.chart.render()
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
