<template lang="pug">
	.g2-tag-cloud
</template>

<script>
	import G2Serie from './base/g2-serie'
	import {DataSet} from '@antv/data-set'
	import G2 from '@antv/g2'
	const ds = new DataSet()
	// 给point注册一个词云的shape
	function getTextAttrs(cfg) {
		return _.assign({}, cfg.style, {
			fillOpacity: cfg.opacity,
			fontSize: cfg.origin._origin.size,
			rotate: cfg.origin._origin.rotate,
			text: cfg.origin._origin.text,
			textAlign: 'center',
			fontFamily: cfg.origin._origin.font,
			fill: cfg.color,
			textBaseline: 'Alphabetic'
		})
	}
	G2.Shape.registerShape('point', 'cloud', {
		drawShape: function drawShape(cfg, container) {
			var attrs = getTextAttrs(cfg);
			return container.addShape('text', {
				attrs: _.assign(attrs, {
					x: cfg.x,
					y: cfg.y
				})
			});
		}
	});
	export default {
		extends: G2Serie,
		name: 'g2-tag-cloud',
		mounted() {
			this.drawChart()
		},
		methods: {
			drawChart() {
				this.chart && this.chart.clear()
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				let range = this.dv.range('value');
				let min = range[0];
				let max = range[1];
				this.dv.transform({
					type: 'tag-cloud',
					fields: ['x', 'value'],
					size: [window.innerWidth, window.innerHeight],
					font: 'Verdana',
					padding: 0,
					timeInterval: 5000, // max execute time
					rotate: function rotate() {
						let random = ~~(Math.random() * 4) % 4;
						if (random == 2) {
							random = 0;
						}
						return random * 90; // 0, 90, 270
					},
					fontSize: function fontSize(d) {
						if (d.value) {
							return (d.value - min) / (max - min) * (80 - 24) + 24;
						}
						return 0;
					}
				});
				this.chart.source(dv, {
					x: {
						nice: false
					},
					y: {
						nice: false
					}
				});
				this.chart.legend(false);
				this.chart.axis(false);
				this.chart.tooltip({
					showTitle: false
				});
				this.chart.coord().reflect();
				this.chart.point().position('x*y').color('category').shape('cloud').tooltip('value*category');
				this.chart.render()
			}
		}
</script>

<style scoped>

</style>
