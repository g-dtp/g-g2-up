<template lang="pug">
	.chart.g2-tag-cloud(v-if='resize')
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
</template>

<script>
	import G2Serie from './base/g2-serie'
	import { DataSet } from '@antv/data-set'
	import G2 from '@antv/g2'

	const ds = new DataSet()

	// 给point注册一个词云的shape
	function getTextAttrs(cfg) {
		return Object.assign({}, cfg.style, {
			fillOpacity: cfg.opacity,
			fontSize: cfg.origin._origin.size,
			rotate: cfg.origin._origin.rotate,
			text: cfg.origin._origin.text,
			textAlign: 'center',
			fill: cfg.color,
			fontFamily: cfg.origin._origin.font,
			textBaseline: 'alphabetic'
		})
	}

	G2.Shape.registerShape('point', 'cloud', {
		drawShape: function drawShape(cfg, container) {
			let attrs = getTextAttrs(cfg)
			return container.addShape('text', {
				attrs: Object.assign(attrs, {
					x: cfg.x,
					y: cfg.y
				})
			})
		}
	})

	export default {
		extends: G2Serie,
		name: 'g2-tag-cloud',
		data() {
			return {
				width: 0,
				height: 0,
				resize: true
			}
		},
		mounted() {
			this.width = this.w
			this.height = this.h
			this.drawChart()
		},
		computed: {
			padding() {
				return this.showTitle ? [this.titleHeight, 24, 24, 24] : [24, 24, 24, 24]
			}
		},
		methods: {
			drawChart() {
				let dimension = this.dimension
				let measure = this.measure[0]
				this.chart && this.chart.clear()
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				if (dimension && measure) {
					let range = this.dv.range(measure)
					let min = range[0]
					let max = range[1]
					this.dv.transform({
						type: 'tag-cloud',
						fields: [dimension, measure],
						size: [this.w - 48, this.h - this.padding[0] - 24],
						padding: 0,
						font: 'Verdana',
						timeInterval: 1000,
						rotate: function rotate(item, index) {
							let random = Math.ceil(item.value % 2)
							if (index % 2 === 0) {
								random = 0 - random
							}
							return random * 45
						},
						fontSize: function fontSize(d) {
							if (min === max) {
								return 16
							}
							if (d.value) {
								return (d.value - min) / (max - min) * (40 - 10) + 10
							}
							return 1
						}
					})
					this.dv.transform({
						type: 'sort-by',
						fields: [ measure ],
						order: 'DESC'
					})
					this.chart.source(this.dv, {
						x: {
							nice: false
						},
						y: {
							nice: false
						}
					})
					this.chart.legend(false)
					this.chart.axis(false)
					this.chart.tooltip({
						showTitle: false
					})
					this.chart.coord().reflect()
					this.chart.point().position('x*y').color(dimension).shape('cloud').tooltip(`${dimension}*${measure}`)
				} else if (dimension) {
					this.dv.transform({
						type: 'map',
						callback(row) {
							row.count = 1
							return row
						}
					})
					this.dv.transform({
						type: 'tag-cloud',
						fields: [dimension, 'count'],
						size: [this.w - 48, this.h - this.padding[0] - 24],
						padding: 0,
						font: 'Verdana',
						timeInterval: 5000,
						rotate: function rotate(item) {
							return 0
						},
						fontSize: function fontSize() {
							return 16
						}
					})
					this.chart.source(this.dv, {
						x: {
							nice: false
						},
						y: {
							nice: false
						}
					})
					this.chart.legend(false)
					this.chart.axis(false)
					this.chart.tooltip({
						showTitle: false
					})
					this.chart.coord().reflect()
					this.chart.point().position('x*y').color(dimension).shape('cloud').tooltip(`${dimension}*count`)
				}
				this.chart.render()
			},
			changeSize(w, h) {
				if (this.chart) {
					this.chart.changeSize(this.w, this.h)
					this.drawChart()
				}
			}
		}
	}
</script>

<style scoped>
	@import '../fonts/font.css';
	.chart {
		position: relative;
	}
</style>
