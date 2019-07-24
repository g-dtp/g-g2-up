<template lang='pug'>
	.g2-china-map
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
			this.drawChart()
		},
		methods: {
			drawChart() {
				let dimension = this.dimension[0]
				let measure = this.measure[0]
				let mapChartData = {}
				this.chartData.forEach(d => {
					mapChartData[d[dimension]] = d[measure]
				})
				console.log(/mapChartData/, mapChartData)
				this.geoDv = ds.createView().source(ChinaData, {
					type: 'GeoJSON'
				})
				this.geoDv.transform({
					type: 'map',
					callback(row) { // 加工数据后返回新的一行，默认返回行数据本身
						row[measure] = mapChartData[row.name] || 0
						console.log(row)
						return row
					}
				})
				this.dv = ds.createView().source(this.chartData)
					.transform({
						geoDataView: this.geoDv,
						field: dimension,
						type: 'geo.region',
						as: ['longitude', 'latitude']
					})

				this.chart && this.chart.clear()
				this.chart.scale({
					longitude: {
						sync: true
					},
					latitude: {
						sync: true
					}
				})
				this.chart.axis(false)
				this.chart.legend({
					name: false,
					reactive: true,
					sizeType: 'circle'
				})
				this.chart.tooltip(true, {
					showTitle: false
				})
				// let bgView = this.chart.view()
				// bgView.source(this.geoDv)
				// bgView.tooltip(false)
				// bgView.polygon()
				// 	.position('longitude*latitude')
				// 	.label(dimension, {
				// 		textStyle: {
				// 			fill: '#000',
				// 			fontSize: 12,
				// 			shadowColor: 'rgba(0, 0, 0, .45)'
				// 		}
				// 	})
				// 	.color('#ebedf0')
				// 	.style({
				// 		lineWidth: 1,
				// 		stroke: '#fafbfc'
				// 	})
				// 	.active(false)
				let userView = this.chart.view()
				userView.source(this.geoDv)
				userView.tooltip(`${dimension}*${measure}`, (a, b) => {
					return {
						name: a,
						value: b
					}
				})
				userView.polygon()
					.position('longitude*latitude')
					.style({
						stroke: '#fff',
						lineWidth: 1
					})
					.color(measure, '#ebedf0-#0050B3')
				try {
					this.chart.render()
				} catch (e) {

				}
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
