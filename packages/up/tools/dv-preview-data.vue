<template lang='pug'>
	.dv-preview-data
		g2-table(
			v-if="data && data.length > 0"
			:showTitle = "false"
			:title = "widget.title"
			:subTitle = "widget.subTitle"
			ref="widget"
			:key="widget.id"
			:chartData="data"
			:name='widget.name'
			:id="widget.id+''"
			:w="width"
			:h="height"
			:dimension="dimension"
			:measure="measure"
			:legend="legend"
			:line="line"
		)
</template>

<script>
	import G2Table from '../../chart/g2-table'
	export default {
		components: { G2Table },
		name: 'dv-preview-data',
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			data: {
				type: Array,
				default: function () {
					return []
				}
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
			}
		},
		computed: {
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
		methods: {

		}
	}
</script>
<style lang="scss" scoped>
	.dv-preview-data {

	}
</style>
