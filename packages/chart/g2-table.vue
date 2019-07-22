<template lang='pug'>
	.chart.g2-table(:style="style")
		g2-title(v-if="showTitle" :title="title" :subTitle="subTitle")
		.g2-table__content
			.g2-table__content__thead(ref="thead")
				table(border=0 cellpadding=0 cellspacing=0 :style='headerStyle')
					colgroup
						col(v-for='column,colIndex in dimension' v-if="column" :key="column"  :width='colWidth' :name="`column_d_${colIndex}`")
						col(v-for='m,colIndex in measure' v-if="m" :key="m"  :width='colWidth' :name="`column_d_${colIndex}`")
						col(v-if="showGutter" :width="gutter" name="gutter" )
					thead
						tr
							th(v-for='column,colIndex in dimension' v-if="column" :key="column" :class="[`column_d_${colIndex}`]") {{column}}
							th(v-for='m,colIndex in measure' v-if="m" :key="m" :class="[`column_m_${colIndex}`]") {{m}}
							th.gutter(v-if="showGutter" :style="{width: `${gutter}px`}")
			.g2-table__content__tbody(ref="tbody")
				table(border=0 cellpadding=0 cellspacing=0 :style='bodyStyle')
					colgroup
						col(v-for='column,colIndex in dimension' v-if="column" :key="column"  :width='colWidth' :name="`column_d_${colIndex}`")
						col(v-for='column,colIndex in measure' v-if="column" :key="column"  :width='colWidth' :name="`column_d_${colIndex}`")
					tbody(ref="table")
						g2-table-row(
							v-for='row,rowIndex in list'
							:key="rowIndex"
							:row="row"
							:index="rowIndex"
							:legend="realLegend"
							:dimension="realDimension"
							:measure="measure"
							:fieldMap="fieldMap"
							:list="list"
						)
</template>

<script>
	import {DataSet} from '@antv/data-set'
	import G2Title from './base/g2-title'
	import G2TableRow from './g2-table/g2-table-row'

	const ds = new DataSet()
	export default {
		name: 'g2-table',
		components: {G2Title, G2TableRow},
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
			},
			defaultWidth: {
				type: Number,
				default: 150
			},
			mergeCell: {
				type: Boolean,
				default: false
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
				bodyWidth: '100%',
				fieldMap: {},
				realDimension: [],
				realLegend: [],
				colWidth: this.defaultWidth
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
			paddingTop() {
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
				if (w + this.gutter < this.$refs.thead.clientWidth) {
					this.headerWidth = this.bodyWidth = '100%'
					this.colWidth = (this.$refs.thead.clientWidth - this.gutter) / this.columns.length
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
				this.fieldMap = {}
				if (this.mergeCell) {
					this.realLegend = [...this.dimension]
					this.realDimension = [this.realLegend.pop()]
					// 给每行生成一个分组id
					let legend
					let keys
					let rows = {}
					this.dv.rows.forEach(row => {
						this.realLegend.forEach((key, index) => {
							legend = index > 0 ? this.realLegend.slice(0, index + 1) : [key]
							keys = []
							legend.forEach(k => {
								keys.push(row[k])
							})
							let id = keys.join('_')
							if (this.fieldMap[id]) {
								this.fieldMap[id] += 1
							} else {
								this.fieldMap[id] = 1
								// 记录每次得第一行
								// row[`__${key}`] = 1
								rows[id] = row
							}
							// '_'代表字段序列
							// row[`_${key}`] = this.fieldMap[id]
							// 只更新第一行
							rows[id][`_${key}`] = this.fieldMap[id]
						})
					})
				} else {
					this.realDimension = [...this.dimension]
					this.realLegend = []
				}
				this.list = [...this.dv.rows]
				this.columns = [...this.dimension, ...this.measure]
				this.calculateGutter()
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
					border-right: 1px solid rgba(5, 19, 50, 0.08);
					background: rgb(246, 247, 248);
					box-sizing: border-box;

					&:last-child {
						border-right: none
					}
				}
			}

			&__tbody {
				flex: auto;
				width: 100%;
				overflow-y: auto;
				overflow-x: auto;
			}
		}
	}
</style>
