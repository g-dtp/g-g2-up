<template lang='pug'>
	.chart.g2-card(:style="{width: w +'px', height: h+'px'}")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
		.g2-card__content(:style="{marginTop: showTitle ? '20px' : 0}")
			.g2-card__content__value {{value || '--'}}
</template>

<script>
	import { DataSet } from '@antv/data-set'
	import G2Title from './base/g2-title'
	const ds = new DataSet()
	export default {
		name: 'g2-card',
		components: { G2Title },
		props: {
			chartData: {
				type: Array,
				default: function () {
					return {
						data: []
					}
				}
			},
			showTitle: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: ''
			},
			subTitle: {
				type: String,
				default: ''
			},
			titleHeight: {
				type: Number,
				default: 60
			},
			w: {
				type: Number,
				default: 200
			},
			h: {
				type: Number,
				default: 200
			},
			id: String,
			name: {
				type: String,
				default: ''
			},
			dimension: {
				type: String,
				default: 'dimension'
			},
			measure: {
				type: Array,
				default: function () {
					return []
				}
			}
		},
		data() {
			return {
				value: ''
			}
		},
		mounted () {
			this.drawChart()
		},
		watch: {
			'chartData'() {
				this.drawChart()
			}
		},
		methods: {
			drawChart () {
				let measure = this.measure[0]
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				this.value = this.dv.rows[0][measure]
			},
			getTransformMapNull () {
				return {
					type: 'map',
					callback: (row) => {
						if (!row[this.dimension]) {
							row[this.dimension] = 'null'
						}
						return row
					}
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../fonts/font.css';
	.chart {
		position: relative;
	}
	.g2-card {
		background: #ffffff;
		overflow: hidden;
		font-family: wf_standard-font_light,helvetica,arial,sans-serif;
		&__title {
			line-height: 1.5;
			font-size: 16px;
		}
		&__content {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			overflow: hidden;
			height: 100%;
			user-select: none;
			&__value {
				font-size: 50px;
				margin: 0 10px;
			}
			&__symbol {
				font-size: 50px;
			}
		}
	}
</style>
