<template lang='pug'>
	.chart.g2-bar-h(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
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
				let config = {}
				let fields = [...this.dimension]
				let dimension = fields.pop()
				// config[dimension] = {
				// 	type: 'cat'
				// }
				this.chart && this.chart.clear()
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				this.chart.coord().transpose()
				if (this.measure.length > 1) {
					this.dv.transform(this.getTransformFold())
					this.chart.source(this.dv, config)
					this.chart.facet('rect', {
						fields: fields,
						autoSetAxis: false,
						padding: 20,
						eachView: (view) => {
							view.intervalStack().position(`${dimension}*value`).color('type')
						}
					})
				} else {
					this.chart.source(this.dv, config)
					if (this.legend) {
						this.chart.facet('rect', {
							fields: fields,
							autoSetAxis: false,
							padding: 20,
							eachView: (view) => {
								view.intervalStack().position(`${dimension}*${this.measure[0]}`).color(this.legend)
							}
						})
					} else {
						this.chart.facet('rect', {
							fields: fields,
							autoSetAxis: false,
							padding: 20,
							eachView: (view) => {
								view.interval().position(`${dimension}*${this.measure[0]}`)
							}
						})
					}
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
