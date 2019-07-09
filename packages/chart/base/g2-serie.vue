<script>
	import G2 from '@antv/g2'
	import G2Title from './g2-title'

	export default {
		name: 'base-serie',
		components: {G2Title},
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
				default: false
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
				default: 70
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
				type: Array,
				default: function () {
					return []
				}
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
				chart: null,
				dv: null,
				realDimension: [],
				realLegend: []
			}
		},
		beforeCreate() {
			this._changeSizeTimer = ''
			this._reForceFitTimer = ''
		},
		computed: {
			padding() {
				let p = [30, 'auto', 'auto', 'auto']
				if (this.showTitle) {
					if (this.title) {
						p = [this.titleHeight - 20, 'auto', 'auto', 'auto']
					}
					if (this.subTitle) {
						p = [this.titleHeight, 'auto', 'auto', 'auto']
					}
				}
				return p
			},
			style() {
				return {
					height: `${this.h}px`,
					width: `${this.w}px`
				}
			}

		},
		mounted() {
			this.initChart()
		},
		watch: {
			chartData: function (val, oldVal) {
				this.drawChart()
			},
			'showTitle'() {
				this.reForceFit()
			},
			'subTitle'(newVal, oldVal) {
				if ((newVal && !oldVal) || (!newVal && oldVal)) {
					this.reForceFit()
				}
			},
			'w'(value) {
				if (value) {
					this.changeSize()
				}
			},
			'h'() {
				this.changeSize()
			}
		},
		created() {
		},
		beforeDestroy() {
		},
		destroyed() {
			if (this.chart) {
				this.chart.clear()
				this.chart.destroy()
			}
		},
		methods: {
			/* dataset */
			getTransformMapNull() {
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
			getTransformFold() {
				return {
					type: 'fold',
					fields: this.measure,
					key: 'type',
					value: 'value'
				}
			},
			getTransformLineFold() {
				return {
					type: 'fold',
					fields: this.line,
					key: 'type',
					value: 'value'
				}
			},
			initChart() {
				if (this.chart) this.chart.destroy()
				this.chart = null
				this.chart = new G2.Chart({
					container: this.$el,
					width: this.w,
					height: this.h,
					padding: this.padding,
					forceFit: this.forceFit,
					autoPaddingAppend: 20
				})
				this.chart.coord(this.coord)
			},
			changeSize(w, h) {
				if (this._changeSizeTimer) clearTimeout(this._changeSizeTimer)
				this._changeSizeTimer = setTimeout(() => {
					if (this.w) {
						this.chart.changeSize(this.w, this.h)
					} else {
						this.chart.changeHeight(this.h)
					}
				}, 100)
			},
			reForceFit() {
				if (this._reForceFitTimer) clearTimeout(this._reForceFitTimer)
				this._reForceFitTimer = setTimeout(() => {
					this.chart.set('padding', this.padding)
					this.drawChart()
				})
			}
		}
	}
</script>
