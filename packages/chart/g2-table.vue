<template lang='pug'>
	.chart.g2-table
		.g2-table__content
			table()
				thead
					th
						td
			table()
				tbody
					tr
						td
</template>

<script>
	import { DataSet } from '@antv/data-set'

	const ds = new DataSet()
	export default {
		name: 'g2-table',
		props: {
			chartData: {
				type: Array,
				default: function () {
					return {
						data: []
					}
				}
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
		data () {
			return {

			}
		},
		mounted () {
			this.drawChart()
		},
		watch: {},
		methods: {
			drawChart () {
				// let measure = this.measure[0]
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				console.log(this.dv.rows)
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
	.chart {

	}

	.g2-table {

	}
</style>
