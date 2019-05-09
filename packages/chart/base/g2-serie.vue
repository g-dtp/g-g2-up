<script>
	import G2 from '@antv/g2'
	import G2Title from './g2-title'
	export default {
		name: 'base-serie',
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
			forceFit: {
				type: Boolean,
				default: true
			},
			showTitle: {
				type: Boolean,
				default: true
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
			/* 坐标系 默认直角坐标系 */
			coord: {
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
				chart: null,
				dv: null
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
			/* dataset */
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
			/* dataset */
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
					autoPaddingAppend: 20
				})
				this.chart.coord(this.coord)
			},
			changeSize (w, h) {
				this.chart.changeSize(w, h)
			},
			reForceFit () {
				this.chart._wrap__initForceFitEvent()
			}
		}
	}
</script>
