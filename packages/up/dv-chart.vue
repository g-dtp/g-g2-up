<template lang='pug'>
	component.dv-chart(
		v-if="data && data.length > 0"
		:is="widget.typeName"
		ref="widget"
		:key="widget.id"
		:chartData="data"
		:name='widget.name'
		:id="widget.id+''"
		:w="widget.grid.width"
		:h="widget.grid.height"
		:dimension="dimension"
		:measure="measure"
		:legend="legend"
		:titleHeight="titleHeight"
	)
</template>
<script>
	export default {
		name: 'dv-chart',
		inject: ['axios', 'url'],
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data () {
			return {
				data: [],
				titleHeight: 0
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
			this.load()
			this.$root.$on('dv-resize', this.onresize)
		},
		beforeDestroy () {
			this.$root.$off('dv-resize', this.onresize)
		},
		methods: {
			onresize() {
				if (this.$children.length > 0) {
					this.$children[0].reForceFit()
				}
			},
			changeSize (w, h) {
				if (this.$refs.content) {
					this.$refs.content.changeSize(w, h)
				}
			},
			load () {
				// 维度和度量都没有时不请求后台
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
				this.loading = true
				this.axios.post(this.url, {
					dataModelId: this.widget.resourceId,
					type: this.widget.resourceType,
					dimensions: this.widget.data.dimension,
					measures: this.widget.data.measure,
					queryColumns: this.widget.data.queryColumns,
					legends: this.widget.data.legend
				})
				.then(res => {
					this.data = res.data.data || []
					this.loading = false
				})
				.catch(() => {
					this.loading = false
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
