<template lang='pug'>
	.g2-province-map
</template>

<script>
	import G2Serie from '../base/g2-serie'
	import { ProvinceData } from 'china-map-geojson'
	import { DataSet } from '@antv/data-set'
	const ds = new DataSet()
	export default {
		extends: G2Serie,
		name: 'g2-province-map',
		data() {
			return {
				geoDv: '',
				dv: '',
				chart: '',
				geojsonList: [],
				current: 0
			}
		},
		mounted() {
			this.geojsonList = Object.values(ProvinceData)
			this.drawChart()
		},
		methods: {
			drawChart() {
				this.geoDv = ds.createView().source(this.geojsonList[this.current], {
					type: 'GeoJSON'
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
				this.chart.tooltip({
					showTitle: true
				})
				let bgView = this.chart.view()
				bgView.source(this.geoDv)
				bgView.tooltip(false)
				bgView.polygon().position('longitude*latitude').color('#ebedf0').style({
					lineWidth: 1,
					stroke: '#fafbfc'
				})
				this.chart.render()
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
