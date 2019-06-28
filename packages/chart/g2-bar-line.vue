<template lang='pug'>
	.chart.g2-bar-line(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>
<script>
	import G2Serie from './base/g2-serie'
	import {DataSet} from '@antv/data-set'

	const ds = new DataSet()
	export default {
		extends: G2Serie,
		name: 'g2-bar-line',
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
		mounted() {
			this.drawChart()
		},
		beforeCreate() {
			this._colors = ['#FACC14', '#57AD71', '#F04864']
		},
		watch: {},
		methods: {
			drawChart() {
				let config = {}
				let dimension = this.dimension[0]
				config[dimension] = {
					type: 'cat'
				}
				this.chart && this.chart.clear()
				if (this.measure.length === 0 && this.line.length === 0) {
					let dv = ds.createView().source(this.chartData)
					this.chart.source(dv, config)
					this.chart.interval().position(`${dimension}*value`).color('#FFFFFF')
				}

				// 绘制柱状
				if (this.measure.length > 0) {
					let dv1 = ds.createView().source(this.chartData)
					dv1.transform(this.getTransformMapNull())
					dv1.transform(this.getTransformFold())
					let view1 = this.chart.view()
					view1.source(dv1, config)
					view1.intervalStack().position(`${dimension}*value`).color('type')
				}
				// 绘制折线
				if (this.line.length > 0) {
					let dv2 = ds.createView().source(this.chartData)
					dv2.transform(this.getTransformMapNull())
					dv2.transform(this.getTransformLineFold())
					let view2 = this.chart.view()
					view2.source(dv2, config)
					view2.axis('value', {
						position: 'right',
						grid: null,
						label: {
							textStyle: {
								fill: '#FACC14'
							}
						}
					})
					view2.line().position(`${dimension}*value`).color('type', this._colors).shape('smooth')
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
