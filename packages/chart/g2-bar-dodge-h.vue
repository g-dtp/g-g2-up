<template lang='pug'>
	.chart.g2-bar-dodge-h(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>

<script>
	import G2Serie from './base/g2-serie'
	import { DataSet } from '@antv/data-set'

	const ds = new DataSet()
	export default {
		extends: G2Serie,
		name: 'g2-bar-dodge-h',
		props: {},
		mounted () {
			this.drawChart()
		},
		watch: {},
		methods: {
			drawChart () {
				this.chart && this.chart.clear()
				this.chart.coord().transpose()
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				this.dv.transform(this.getTransformFold())
				this.chart.source(this.dv)
				this.chart.interval().position(`${this.dimension}*value`).color('type').adjust([{
					type: 'dodge',
					dodgeBy: 'type',
					marginRatio: 0
				}, {
					type: 'stack'
				}])
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
