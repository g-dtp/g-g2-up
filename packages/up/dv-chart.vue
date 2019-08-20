<template lang='pug'>
	component.dv-chart(
		v-if="data && data.length > 0 && !showData"
		:is="widget.typeName"
		:showTitle = "showTitle"
		:title = "widget.title"
		:subTitle = "widget.subTitle"
		:mergeCell = "widget.styleObject.mergeCell"
		ref="widget"
		:key="widget.id"
		:chartData="data"
		:name='widget.name'
		:id="widget.id+''"
		:w="width"
		:h="height"
		:forceFit="forceFit"
		:dimension="dimension"
		:measure="measure"
		:legend="legend"
		:line="line"
	)
	dv-preview-data.preview-warp(v-else-if="data && data.length > 0 && showData" :widget ="widget" :data="data" :key="'table'" :gap="gap" :edit="edit" :editWidth="editWidth" :editHeight="editHeight")
	.dv-chart.empty(v-else)
		g-icon(:iconClass="`icon-default-${widget.typeName}`")
</template>
<script>
	import GIcon from './g-icon'
	import DvPreviewData from './tools/dv-preview-data'

	export default {
		name: 'dv-chart',
		inject: ['axios', 'url'],
		components: {GIcon, DvPreviewData},
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			forceFit: {
				type: Boolean,
				default: false
			},
			showData: {
				type: Boolean,
				default: false
			},
			gap: {
				default: 0
			},
			edit: {
				type: Boolean,
				default: false
			},
			editWidth: {
				default: 0
			},
			editHeight: {
				default: 0
			}
		},
		data() {
			return {
				data: [],
				timer: null
			}
		},
		computed: {
			showTitle() {
				return this.widget.styleObject.showTitle
			},
			width () {
				return this.edit ? this.editWidth - this.gap : this.widget.grid.width - this.gap
			},
			height () {
				return this.edit ? this.editHeight - this.gap : this.widget.grid.height - this.gap
			},
			dimension() {
				let dimension = []
				this.widget.data.dimension.forEach(item => {
					dimension.push(item.alia || item.meta)
				})
				return dimension
			},
			line() {
				let line = []
				this.widget.data.line.forEach(item => {
					line.push(item.alia || item.meta)
				})
				return line
			},
			measure() {
				let measure = []
				this.widget.data.measure.forEach(item => {
					measure.push(item.alia || item.meta)
				})
				return measure
			},
			legend() {
				let legend = []
				this.widget.data.legend.forEach(item => {
					legend.push(item.alia || item.meta)
				})
				return legend[0]
			}
		},
		mounted() {
			this.load()
			this.$root.$on('update-charts', this.updateChart)
		},
		beforeDestroy() {
			this.$root.$off('update-charts', this.updateChart)
		},
		methods: {
			updateChart(widget) {
				if (widget && widget.id === this.widget.id) {
					this.load()
				}
			},
			load() {
				// 维度和度量都没有时不请求后台
				if (!this.widget.data.dimension && !this.widget.data.measure) {
					this.data = []
					return
				}
				if (this.widget.data.dimension.length === 0 && this.widget.data.measure.length === 0) {
					this.data = []
					return
				}
				// 根父容器注入 axios
				if (!this.axios) {
					console.error('根父容器需要注入axios')
					return
				}
				// 根父容器注入 axios
				if (!this.url) {
					console.error('根父容器需要注入url')
					return
				}
				if (!this.widget.data.line) {
					this.widget.data.line = []
				}
				this.axios.post(this.url, {
					dataModelId: this.widget.resourceId,
					type: this.widget.resourceType,
					dimensions: this.widget.data.dimension,
					measures: [...this.widget.data.measure, ...this.widget.data.line],
					line: this.widget.data.line,
					queryColumns: this.widget.data.queryColumns,
					legends: this.widget.data.legend
				})
					.then(res => {
						this.data = res.data.data.result || []
					})
					.catch(() => {
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dv-chart {
		position: relative;
		min-width: 20px;
		min-height: 20px;
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		&.active {
			box-shadow: 0 0 0 1px #3D89FF;
		}

		.title {
			position: absolute;
			box-sizing: border-box;
			font-size: 16px;
			padding: 10px 10px;
			color: rgba(0, 0, 0, 0.85);
			flex: none;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap
		}

		.chart {
			position: relative;
			width: 100%;
			box-sizing: border-box;
		}
	}

	.empty {
		background: rgba(255, 255, 255, 0.9);
		text-align: center;
		font-size: 12px;
		height: 100%;
		flex: auto;
		display: flex;
		align-items: center;
		justify-content: center;

		/deep/ .icon {
			width: 30%;
			height: 30%;
		}
	}
</style>
