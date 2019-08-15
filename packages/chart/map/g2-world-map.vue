<template lang='pug'>
	.g2-world-map
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>

<script>
	import G2Serie from '../base/g2-serie'
	import WorldData from 'world-map-geojson'
	import { DataSet } from '@antv/data-set'
	const ds = new DataSet()
	export default {
		extends: G2Serie,
		name: 'g2-world-map',
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
				this.geoDv = ds.createView().source(WorldData, {
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
					showTitle: false
				})
				let bgView = this.chart.view()
				bgView.source(this.geoDv)
				bgView.tooltip(false)
				bgView.polygon().position('longitude*latitude').color('#ebedf0').style({
					lineWidth: 1,
					stroke: '#fafbfc'
				}).active(false).tooltip()
				this.chart.render()
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
