<template lang='pug'>
	.chart-box(:class="{active: active}" :style='chartStyle')
		component(
			v-if="data && data.length > 0 && refresh"
			:is="chartName"
			ref="content"
			:key="widget.id"
			:chartData="data"
			:name='widget.name'
			:id="'uid_'+widget.id"
			:w="widget.grid.width"
			:h="widget.grid.height"
			:dimension="dimension"
			:measure="measure"
			:legend="legend"
			:titleHeight="titleHeight"
			:showTitle="styleObject.showTitle"
		)
</template>
<script>
	import { getDataByFeild } from '@/fetch/board'
	export default {
		name: 'chart-layout',
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			/* 当前被选中激活 */
			active: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				data: [],
				refresh: true,
				timer: null
			}
		},
		computed: {
			dimension () {
				let dimension = []
				this.widget.data.dimension.forEach(item => {
					dimension.push(item.meta)
				})
				return dimension[0]
			},
			measure () {
				let measure = []
				this.widget.data.measure.forEach(item => {
					measure.push(item.meta)
				})
				return measure
			},
			legend () {
				let legend = []
				this.widget.data.legend.forEach(item => {
					legend.push(item.meta)
				})
				return legend[0]
			}
		},
		mounted () {
			this.loadData()
			this.$root.$on('update-charts', this.updateChart)
		},
		beforeDestroy () {
			if (this.timer) {
				clearTimeout(this.timer)
			}
			this.$root.$off('update-charts', this.updateChart)
		},
		methods: {
			onRefresh () {
				this.refresh = false
				this.$nextTick(() => {
					this.refresh = true
				})
			},
			changeSize (w, h) {
				if (this.$refs.content) {
					this.$refs.content.changeSize(w, h)
				}
			},
			updateChart (widget) {
				if (widget && widget.id === this.widget.id) {
					this.loadData()
				}
			},
			async loadData () {
				if (this.widget.data.dimension.length === 0 && this.widget.data.measure.length === 0) {
					this.data = []
					return
				}
				getDataByFeild(
					{
						dataModelId: this.widget.resourceId,
						type: this.widget.resourceType,
						dimensions: this.widget.data.dimension,
						measures: this.widget.data.measure,
						queryColumns: this.widget.data.queryColumns,
						legends: this.widget.data.legend
					}).then(data => {
					this.data = data
					if (data && data.length === 0) {
					}
				})
					.catch(() => {
					})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.chart-box {
		position: relative;
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
			width: 100%;
			box-sizing: border-box;
		}

		.empty {
			background: rgba(255, 255, 255, 0.9);
			text-align: center;
			font-size: 12px;
			flex: auto;
			display: flex;
			align-items: center;
			justify-content: center;

			/deep/ .icon {
				width: 30%;
				height: 30%;
			}
		}
	}
</style>
