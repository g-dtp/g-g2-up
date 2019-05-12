<template lang='pug'>
	.chart.g2-table(:style="style")
		.g2-table__content
			.g2-table__content__thead
				table(border=0 cellpadding=0 cellspacing=0)
					thead
						colgroup
							col(v-for='column,colIndex in columns' :key="column" width="180" :name="column")
						tr
							th(v-for='column,colIndex in columns' :key="column") {{column}}
							th.gutter(:style="{width: '17px'}")
			.g2-table__content__tbody
				table(border=0 cellpadding=0 cellspacing=0)
					colgroup
						col(v-for='column,colIndex in columns' :key="column" width="180" :name="column")
					tbody
						tr(v-for='cell,rowIndex in list' :key="rowIndex")
							td(v-for='column,colIndex in columns' :key="column" :name="column") {{cell[column]}}
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
		data() {
			return {
				columns: [],
				list: []
			}
		},
		mounted() {
			this.drawChart()
		},
		watch: {},
		computed: {
			style() {
				return {
					width: `${this.w}px`,
					height: `${this.h}px`
				}
			}
		},
		methods: {
			drawChart() {
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				this.list = [...this.dv.rows]
				this.columns = [this.dimension, ...this.measure]
			},
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
			}
		}
	}
</script>
<style lang="scss" scoped>
	.chart {

	}

	.g2-table {
		background: #ffffff;
		table {
			border: none;
			width: 100%;
			height: 100%;
		}

		&__content {
			height: 100%;
			overflow-y: hidden;
			overflow-x: auto;
			display: flex;
			flex-direction: column;

			&__thead {
				flex: 1;
			}
			&__tbody {
				flex: auto;
				overflow-y: auto;
			}
		}
	}
</style>
