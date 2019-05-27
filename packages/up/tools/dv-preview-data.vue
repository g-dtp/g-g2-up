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
			:w="widget.grid.width"
			:h="widget.grid.height"
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
			}
		},
		data() {
			return {
			}
		},
		computed: {
			dimension() {
				let dimension = []
				this.widget.data.dimension.forEach(item => {
					dimension.push(item.meta)
				})
				return dimension[0]
			},
			line() {
				let line = []
				this.widget.data.line.forEach(item => {
					line.push(item.meta)
				})
				return line
			},
			measure() {
				let measure = []
				this.widget.data.measure.forEach(item => {
					measure.push(item.meta)
				})
				return measure
			},
			legend() {
				let legend = []
				this.widget.data.legend.forEach(item => {
					legend.push(item.meta)
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
