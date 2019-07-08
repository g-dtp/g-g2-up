<template lang='pug'>
	.div-box(:style="boxStyle")
		.div-box-content
			dv-chart(v-if="widget.category == 0" :widget ="widget" :gap="10" :forceFit="true")
			dv-ui(v-else-if="widget.category == 1" :widget ="widget" )
			dv-layout(v-else-if="widget.category == 2" :widget ="widget")
				dv-box(v-for="subWidget in widget.children" :widget ="subWidget")
			dv-menu.dv-more-menu(:class="{over: !over}" @preview="onShowData" @delete="onDelete" :category="widget.category" :showDataDefault="showData" :mode="mode")
			dv-resize(@start-resize="onStartResize" @resizing="onResizing" @resize-end="onResizeEnd")
</template>

<script>
	import DvChart from './dv-chart'
	import DvLayout from './dv-layout'
	import DvUi from './dv-ui'
	import DvBox from './dv-box'
	import DvResize from './tools/dv-resize'
	import DvMenu from './tools/dv-menu'
	export default {
		name: 'dv-box',
		inject: ['layout'],
		components: { DvBox, DvChart, DvUi, DvLayout, DvResize, DvMenu },
		data () {
			return {
				layoutClass: this.layout,
				over: false,
				showData: false,
				mode: false,
				change: false,
				height: 0
			}
		},
		computed: {
			boxStyle() {
				return {
					height: `${this.widget.grid.height}px`
				}
			}
		},
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		mounted() {
			this.height = this.widget.grid.height
		},
		methods: {
			onShowData() {},
			onDelete() {},
			onStartResize () {
			},
			onResizing(data) {
				this.change = true
				let h = this.height + data.dy
				if (h < 180) {
					h = 180
				}
				this.widget.grid.height = h
			},
			onResizeEnd() {
				this.height = this.widget.grid.height
				this.change = false
			}
		}
	}
</script>
<style lang="scss" scoped>
	.div-box {
		position: relative;
		flex: none;
		width: 100%;
		padding: 5px;
		background: transparent;
		box-sizing: border-box;
		user-select: none;
		.div-box-content {
			background: #ffffff;
			position: relative;
			height: 100%;
			overflow: hidden;
		}
		.dv-resize {
			display: none;
			right: 10px;
			bottom: 10px;
		}
		.dv-more-menu {
			position: absolute;
			display: none;
			right: 5px;
			top: 5px;
		}
		&:hover {
			.dv-resize {
				display: block;
			}
			.dv-more-menu {
				display: block;
			}
		}
	}
</style>
