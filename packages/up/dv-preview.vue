<template lang='pug'>
	.dv-preview(:style="boxStyle" :class="[theme]")
		dv-chart.dv-edit-content(v-if="widget.category == 0" :widget ="widget" :class="[layoutClass, style]" :showData="showData")
		dv-ui.dv-edit-content(v-else-if="widget.category == 1" :widget ="widget" :class="[layoutClass, style]")
</template>

<script>
	import DvChart from './dv-chart'
	import DvUi from './dv-ui'
	export default {
		name: 'dv-preview',
		inject: ['layout'],
		components: { DvChart, DvUi },
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			theme: {
				type: String,
				default: 'blue'
			}
		},
		data () {
			return {
				showData: false,
				layoutClass: this.layout
			}
		},
		computed: {
			style () {
				return {}
			},
			boxStyle () {
				return {
					position: 'absolute',
					left: `${this.widget.grid.x}px`,
					top: `${this.widget.grid.y}px`,
					height: `${this.widget.grid.height}px`,
					width: `${this.widget.grid.width}px`
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-preview {

	}
</style>
<style lang="scss">
	.black {
		.chart {
			.g2-title {
				h1 {
					color: #D0F0FF !important;
				}
				h3 {
					color: rgba(208, 240, 255, 0.6) !important;
				}
			}
		}
	}
</style>
