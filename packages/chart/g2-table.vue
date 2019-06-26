<template lang='pug'>
	.chart.g2-table(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
		.g2-table__content
			.g2-table__content__thead(ref="thead")
				table(border=0 cellpadding=0 cellspacing=0 :style='headerStyle')
					colgroup
						col(v-for='column,colIndex in columns' :key="column" :width='defaultWidth' :name="`column_${colIndex}`")
						col
						col(v-if="showGutter" :width="gutter" name="gutter" )
					thead
						tr
							th(v-for='column,colIndex in columns' :key="column" :class="[`column_${colIndex}`]") {{column}}
							th
							th.gutter(v-if="showGutter" :style="{width: `${gutter}px`}")
			.g2-table__content__tbody(ref="tbody")
				table(border=0 cellpadding=0 cellspacing=0 :style='bodyStyle')
					colgroup
						col(v-for='column,colIndex in columns' :key="column"  :width='defaultWidth' :name="`column_${colIndex}`")
					tbody
						tr(v-for='cell,rowIndex in list' :key="rowIndex" :class="{striped: rowIndex%2 != 0}")
							td(v-for='column,colIndex in columns' :key="column" :class="[`column_${colIndex}`]") {{cell[column]}}
							td
</template>

<script>
	import { DataSet } from '@antv/data-set'
	import G2Title from './base/g2-title'
	const ds = new DataSet()
	export default {
		name: 'g2-table',
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
			},
			defaultWidth: {
				type: Number,
				default: 80
			}
		},
		data() {
			return {
				timer: null,
				columns: [],
				list: [],
				showGutter: false,
				gutter: 0,
				headerWidth: '100%',
				bodyWidth: '100%'
			}
		},
		mounted() {
			this.drawChart()
			if (this.$refs.tbody) {
				this.$refs.tbody.addEventListener('scroll', this.scrollX)
			}
		},
		beforeDestroy() {
			if (this.$refs.tbody) {
				this.$refs.tbody.removeEventListener('scroll', this.scrollX)
			}
		},
		watch: {
			'chartData'() {
				this.drawChart()
			},
			'w'() {
				this.calculateGutter()
			},
			'h'() {
				this.calculateGutter()
			},
			'columns': {
				immediate: true,
				handler: function (value) {
					if (value) {
						this.calculateWidth()
					}
				}
			},
			'list': {
				immediate: true,
				handler: function (value) {
					if (value && value.length > 0) {
						this.showList = value
					} else {
						this.showList = []
						let len = this.columns.length
						for (let i = 0; i < 10; i++) {
							this.showList.push(new Array(len))
						}
					}
					this.calculateGutter()
				}
			}
		},
		computed: {
			style() {
				return {
					width: `${this.w}px`,
					height: `${this.h}px`,
					paddingTop: this.paddingTop
				}
			},
			paddingTop () {
				let top = '16px'
				if (this.showTitle) {
					top = '50px'
					if (this.subTitle) {
						top = '70px'
					}
				}
				return top
			},
			headerStyle() {
				return {
					width: this.headerWidth
				}
			},
			bodyStyle() {
				return {
					width: this.bodyWidth
				}
			}
		},
		methods: {
			scrollX() {
				this.$refs.thead.scrollLeft = this.$refs.tbody.scrollLeft
			},
			calculateWidth() {
				if (!this.$refs.tbody) return
				let w = this.columns.length * this.defaultWidth
				if (w < this.$refs.thead.clientWidth) {
					this.headerWidth = this.bodyWidth = '100%'
				} else {
					this.headerWidth = w + this.gutter + 'px'
					this.bodyWidth = w + 'px'
				}
			},
			calculateGutter() {
				if (this.timer) clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					if (!this.$refs.tbody) return
					let el = this.$refs.tbody
					this.gutter = el.offsetWidth - el.clientWidth
					this.showGutter = el.scrollHeight > el.clientHeight
					this.calculateWidth()
				})
			},
			drawChart() {
				this.dv = ds.createView().source(this.chartData)
				this.dv.transform(this.getTransformMapNull())
				this.list = [...this.dv.rows]
				this.columns = [this.dimension, ...this.measure]
				this.calculateGutter()
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
		/deep/ .g2-title {
			left: 0;
			top: 0;
		}
		background: #ffffff;
		padding: 16px 16px 16px 16px;
		box-sizing: border-box;

		table {
			table-layout: fixed;
			border: none;
			width: 100%;
			height: 100%;
			text-align: center;
		}
		th.gutter {
			padding: 0;
			border-left: none
		}

		&__content {
			border: 1px solid rgba(5, 19, 50, 0.24);
			height: 100%;
			overflow: hidden;
			/*overflow-x: auto;*/
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			&__thead {
				flex: none;
				overflow: hidden;
				border-bottom: 1px solid rgba(5, 19, 50, 0.24);

				th {
					height: 35px;
					padding: 0;
					font-size: 12px;
					font-weight: 500;
					border-left: 1px solid rgba(5, 19, 50, 0.08);
					background: rgb(246, 247, 248);
					box-sizing: border-box;
					&:first-child {
						border-left: none
					}
				}

			}

			&__tbody {
				flex: auto;
				width: 100%;
				overflow-y: auto;
				overflow-x: auto;
				td {
					height: 35px;
					font-size: 14px;
					padding: 0;
					border-left: 1px solid rgba(5, 19, 50, 0.08);
					border-bottom: 1px solid rgba(5, 19, 50, 0.08);
					box-sizing: border-box;
					&:first-child {
						border-left: none
					}
				}

				tr:last-child {
					td {
						border-bottom: none
					}
				}
				tr.striped {
					background: rgba(5,19,50,0.04);
				}
				tr:hover {
					td {
						background:  rgba(5,19,50,0.12);
					}
				}
			}
		}
	}
</style>
