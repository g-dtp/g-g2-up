<template>

</template>
<script>
	import G2 from '@antv/g2'

	export default {
		name: 'base-serie',
		props: {
			chartData: {
				type: Array,
				default: function () {
					return {
						data: [],
						dv: null
					}
				}
			},
			showTitle: {
				type: Boolean,
				default: false
			},
			titleHeight: {
				type: Number,
				default: 50
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
			coordType: {
				type: String,
				default: 'rect'
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
		data () {
			return {
				chart: null
			}
		},
		computed: {
			padding () {
				return this.showTitle ? [this.titleHeight, 'auto', 'auto', 'auto'] : [30, 'auto', 'auto', 'auto']
			},
			style () {
				return {
					height: `${this.h}px`,
					width: `${this.w}px`
				}
			}

		},
		mounted () {
			this.initChart()
		},
		watch: {
			chartData: function (val, oldVal) {
				this.drawChart()
			}
		},
		created () {
		},
		beforeDestroy () {
		},
		destroyed () {
			if (this.chart) {
				this.chart.clear()
				this.chart.destroy()
			}
		},
		methods: {
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
			},
			getTransformFold () {
				return {
					type: 'fold',
					fields: this.measure,
					key: 'type',
					value: 'value'
				}
			},
			initChart () {
				if (this.chart) this.chart.destory()
				this.chart = null
				this.chart = new G2.Chart({
					container: this.$el,
					width: this.w,
					height: this.h,
					padding: this.padding,
					autoPaddingAppend: 10
				})
				this.chart.coord(this.coordType)
			},
			initChartData (options) {
				this.chart.source(this.chartData, options)
			},
			changeSize (w, h) {
				this.chart.changeSize(w, h)
			}
		}
	}
</script>
