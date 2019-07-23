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
				this.geoDv = ds.createView().source(ChinaData, {
					type: 'GeoJSON'
				})
				let dimension = this.dimension[0]
				this.dv = ds.createView().source(this.chartData).transform({
					geoDataView: this.geoDv,
					field: dimension,
					type: 'geo.region',
					as: ['longitude', 'latitude']
				})
				console.log(this.dv)
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
				this.chart.tooltip({
					showTitle: false
				})
				let bgView = this.chart.view()
				bgView.source(this.geoDv)
				bgView.tooltip(false)
				bgView.polygon()
					.position('longitude*latitude')
					.label(dimension, {
						textStyle: {
							fill: '#fff',
							fontSize: 10,
							shadowBlur: 2,
							shadowColor: 'rgba(0, 0, 0, .45)'
						}
					})
					.color('#ebedf0')
					.style({
						lineWidth: 1,
						stroke: '#fafbfc'
					})
					.active(false)
				let userView = this.chart.view()
				userView.source(this.dv)
				userView.polygon()
					.position('longitude*latitude')

					.style({
						stroke: '#fff',
						lineWidth: 1
					})
					.color('人口', '#BAE7FF-#1890FF-#0050B3')
				this.chart.render()
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
