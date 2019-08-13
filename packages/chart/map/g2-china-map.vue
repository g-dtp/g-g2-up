<template lang='pug'>
	.chart.g2-china-map
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>

<script>
	import G2Serie from '../base/g2-serie'
	import { ChinaData } from 'china-map-geojson'
	import { DataSet } from '@antv/data-set'
	const ds = new DataSet()
	export default {
		extends: G2Serie,
		name: 'g2-china-map',
		data() {
			return {
				geoDv: '',
				dv: '',
				chart: ''
			}
		},
		mounted() {
			try {
				this.drawChart()
			} catch (e) {

			}

		},
		methods: {
			drawChart() {
				let dimension = this.dimension[0]
				let measure = this.measure[0]
				let mapChartData = {}
				this.chartData.forEach(d => {
					mapChartData[d[dimension]] = d[measure]
				})
				this.dv = ds.createView()
					.source(ChinaData, {
						type: 'GeoJSON'
					})
					.transform({
						type: 'map',
						callback(row) {
							row[measure] = mapChartData[row.name] || 0
							row[dimension] = row.name || 0
							return row
						}
					})
				console.log(this.dv)
				this.chart && this.chart.clear()
				this.chart.axis(false)
				this.chart.legend({
					name: false,
					reactive: true,
					slidable: false,
					sizeType: 'circle'
				})
				this.chart.tooltip(true, {
					showTitle: true,
					title: dimension
				})
				this.chart.source(this.dv)
				this.chart.tooltip(`${dimension}*${measure}`, (a, b) => {
					return {
						name: a,
						value: b
					}
				})
				this.chart.polygon()
					.position('longitude*latitude')
					.style({
						stroke: '#fff',
						lineWidth: 2
					})
					.label(dimension, {
						textStyle: {
							fill: '#000',
							fontSize: 10
						}
					})
					.active(false)
					.select(false)
					.color(measure, '#ebedf0-#0050B3')
				this.chart.render()
			}
		}
	}
</script>
<style lang="scss">
	.g2-china-map {
		.g-labels {
			div.g-label {
				color: #3D89FF !important;
				font-size: 12px !important;
				width: 36px;
			}
		}
	}
</style>
<style lang="scss" scoped>

</style>
