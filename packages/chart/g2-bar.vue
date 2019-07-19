<template lang='pug'>
	.chart.g2-bar(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>
<script>
	import G2Serie from './base/g2-serie'
	import { DataSet } from '@antv/data-set'

	const ds = new DataSet()
	export default {
		extends: G2Serie,
		name: 'g2-bar',
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
				let labelConfig = {
					position: 'middle',
					offset: 0,
					textStyle: {
						fontSize: 11,
						fill: '#f2f2f2'
					}
				}
				let fields = [...this.dimension]
				let dimension = fields.pop()
				let scaleConfig = {}
				scaleConfig[dimension] = {
					// sync: true
				}
				scaleConfig[this.legend] = {
					sync: true
				}
				this.measure.forEach(m => {
					scaleConfig[m] = {
						sync: true
					}
				})
				this.chart && this.chart.clear()
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				if (this.measure.length > 1) {
					this.dv.transform(this.getTransformFold())
					this.dv.transform({
						type: 'sort-by',
						fields: [ 'value' ],
						order: 'DESC'
					})
					this.chart.source(this.dv, scaleConfig)
					this.chart.facet('rect', {
						fields: fields,
						padding: 20,
						eachView: (view) => {
							view.intervalStack().position(`${dimension}*value`).color('type').label('value', labelConfig)
						}
					})
				} else if (this.measure.length === 1) {
					this.dv.transform({
						type: 'sort-by',
						fields: [this.measure[0]],
						order: 'DESC'
					})
					this.chart.source(this.dv, scaleConfig)
					if (this.legend) {
						this.chart.facet('rect', {
							fields: fields,
							padding: 20,
							eachView: (view) => {
								view.intervalStack().position(`${dimension}*${this.measure[0]}`).color(this.legend).label(this.measure[0], labelConfig)
							}
						})
					} else {
						this.chart.facet('rect', {
							fields: fields,
							padding: 20,
							eachView: (view) => {
								view.interval().position(`${dimension}*${this.measure[0]}`).label(this.measure[0], labelConfig)
							}
						})
					}
				} else {
					// this.dv.transform({
					// 	type: 'map',
					// 	callback(row) {
					// 		row.count = 1
					// 		return row
					// 	}
					// })
					// this.chart.source(this.dv, scaleConfig)
					// if (this.legend) {
					// 	this.chart.facet('rect', {
					// 		fields: fields,
					// 		padding: 20,
					// 		eachView: (view) => {
					// 			view.intervalStack().position(`${dimension}*count`).color(this.legend).label('count', labelConfig)
					// 		}
					// 	})
					// } else {
					// 	this.chart.facet('rect', {
					// 		fields: fields,
					// 		padding: 20,
					// 		eachView: (view) => {
					// 			view.interval().position(`${dimension}*count`).label('count', labelConfig)
					// 		}
					// 	})
					// }
				}
				this.chart.tooltip(`${this.dimension}*count`, {
					useHtml: true
				})
				this.chart.axis(this.dimension, {
					label: {
						autoRotate: true,
						autoHide: true
					}
				})
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
