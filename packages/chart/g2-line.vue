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
		name: 'g2-line',
		props: {},
		mounted () {
			this.drawChart()
		},
		watch: {},
		methods: {
			drawChart () {
				let config = {}
				let fields = [...this.dimension]
				let dimension = fields.pop()
				this.chart && this.chart.clear()
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				this.dv.transform(this.getTransformFold())
				this.chart.scale(dimension, { range: [0, 1] })
				this.chart.facet('rect', {
					fields: fields,
					autoSetAxis: false,
					padding: 20,
					eachView: function eachView(view) {
						view.line().position(`${dimension}*value`).color('type').size(2).shape('circle')
					}
				})
				this.chart.source(this.dv, config)
				this.chart.render()
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
