<template lang='pug'>
	.chart.g2-pie(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>
<script>
	import { DataSet } from '@antv/data-set'
	import G2Serie from './base/g2-serie'
	import G2 from '@antv/g2'
	import { toFixed2, toFixed } from './formatter'
	const ds = new DataSet()

	export default {
		extends: G2Serie,
		name: 'g2-pie',
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
				this.dv = ds.createView()
					.source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				this.chart.tooltip({
					showTitle: false
				})
				let dimension = this.dimension[0]
				if (dimension && this.measure.length === 0) {
					// 只有X轴有数据时，兼容一个友好得显示
					this.chart.coord('theta', {})
					this.dv.transform({
						type: 'map',
						callback(row) {
							row.count = 1
							return row
						}
					})
					this.dv.transform({
						type: 'fold',
						fields: dimension,
						key: 'type',
						value: 'value'
					})
					this.chart.source(this.dv)
					this.chart.intervalStack()
						.position('count')
						.color('value')
						.label('value', { offset: -10 })
				} else if (dimension && this.measure.length === 1) {
					// 单个Y轴
					this.chart.coord('theta', {})
					this.dv.transform({
						type: 'fold',
						fields: this.measure,
						key: 'type',
						value: 'value'
					})
					this.dv.transform({
						type: 'sort-by',
						fields: 'value',
						order: 'DESC'
					})
					this.dv.transform({
						type: 'percent',
						field: 'value',
						dimension: dimension,
						as: 'percent'
					})
					this.chart.source(this.dv, {
						percent: {
							formatter: toFixed2
						}
					})
					this.chart.intervalStack()
						.position('percent')
						.color(dimension)
						.label('percent', (percent) => {
							if (percent > 0.05){
								return toFixed(percent)
							} else {
								return ''
							}
						}, { offset: -10 })
				} else {
					this.chart.coord('theta', {
						radius: 0.7
					})
					// 多个Y轴
					this.dv.transform({
						type: 'fold',
						fields: this.measure,
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
					this.chart.source(this.dv, {
						percent: {
							formatter: toFixed2
						}
					})
					this.chart.intervalStack().position('percent').color(dimension).label(dimension, { offset: -20 }).select(false).style({
						lineWidth: 1,
						stroke: '#fff'
					})
					// 外圈
					let outDv = ds.createView()
						.source(this.chartData)
					outDv.transform({
						type: 'fold',
						fields: this.measure,
						key: 'type',
						value: 'value'
					})
					outDv.transform({
						type: 'percent',
						field: 'value',
						dimension: 'type',
						as: 'percent',
						groupBy: [ dimension ]
					})
					let outter = this.chart.view()
					outter.coord('theta', {
						innerRadius: 0.7 / 0.9,
						radius: 0.9
					})
					outter.source(outDv, {
						percent: {
							formatter: toFixed2
						}
					})
					let colors = G2.Global.colors_pie_16[0] + '-' + G2.Global.colors_pie_16[this.chartData.length - 1]
					outter.intervalStack().position('value')
						.color(dimension, colors)
						.tooltip('type*percent', function(item, percent) {
						return {
							name: item,
							value: toFixed2(percent)
						}
					}).select(false).style({
						lineWidth: 1,
						stroke: '#fff'
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
