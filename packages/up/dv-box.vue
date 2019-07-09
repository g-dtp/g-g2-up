<template lang='pug'>
	.dv-box(
		:style="boxStyle"
		:class="[{layout: widget.category == 2}, {transition: !change}, {moving: change}, theme]"
		@mousedown.stop="onActive(widget)"
		@mouseenter.stop="onEnter"
		@mouseleave.stop="onLeave"
		)
		.div-box-content(:class="{active: activeWidget == widget}")
			dv-chart(v-if="widget.category == 0" :widget ="widget" :gap="10" :forceFit="true")
			dv-ui(v-else-if="widget.category == 1" :widget ="widget" )
			dv-layout(
				v-else-if="widget.category == 2"
				:widget ="widget"
				@drop-layout="onDropLayout"
				:class="{'empty-layout': widget.children.length == 0}" :refresh="refresh")
				dv-box.child(
					v-for="subWidget in widget.children"
					:widget ="subWidget"
					@delete-self="onDelete"
					:activeWidget = "activeWidget"
					@change-activated="onActive"
					)
				.empty-link(v-if="widget.children.length == 0" @click="onDelete(widget)") 删除容器
			dv-menu.dv-more-menu(v-if="widget.category != 2" @preview="onShowData" @delete="onDelete" :category="widget.category" :showDataDefault="showData" :mode="mode")
			dv-resize(v-if="widget.category != 2" @start-resize="onStartResize" @resizing="onResizing" @resize-end="onResizeEnd")
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
				height: 0,
				refresh: true
			}
		},
		computed: {
			boxStyle() {
				return {
					height: this.widget.category === 2 ? 'auto' : `${this.widget.grid.height}px`
				}
			}
		},
		watch: {
			'widget.children' () {
				this.doRefresh()
			}
		},
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			activeWidget: {
				type: Object,
				default: function () {
					return null
				}
			},
			theme: {
				type: String,
				default: 'blue'
			}
		},
		mounted() {
			this.height = this.widget.grid.height
			window.addEventListener('resize', this.doRefresh.bind(this))
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.doRefresh.bind(this))
		},
		methods: {
			doRefresh() {
				this.refresh = false
				this.$nextTick(() => {
					this.refresh = true
				})
			},
			onEnter(e) {
				e.stopPropagation()
				this.over = true
			},
			onLeave(e) {
				e.stopPropagation()
				this.over = false
			},
			onShowData() {},
			onDelete(widget) {
				if (widget) {
					this.$emit('delete-self', widget)
				} else {
					this.$emit('delete-self', this.widget)
				}
			},
			onActive(widget) {
				this.$emit('change-activated', widget || this.widget)
			},
			onDropLayout(data) {
				this.$emit('drop-box', {
					parent: this.widget,
					data
				})
			},
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
				let h = this.widget.grid.height
				let height = Math.ceil(h / 180 - 0.1) * 180
				this.widget.grid.height = height
				this.height = height
				this.change = false
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-box {
		position: relative;
		flex: none;
		width: 100%;
		padding: 5px;
		background: transparent;
		box-sizing: border-box;
		user-select: none;

		&.transition {
			transition: transform .25s, width .25s, height .25s, left  .25s , top .25s ;
		}
		&.layout {
			padding: 0;
			border: 1px dashed #dddddd;
			min-height: 180px;
			margin-bottom: 5px;
		}
		.div-box-content {
			position: relative;
			height: 100%;
			overflow: hidden;
			.child {
				flex: 1;
			}
			&.active {
				box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
			}
		}
		.dv-resize {
			display: none;
			right: 10px;
			bottom: 10px;
		}
		.dv-more-menu {
			display: none;
			position: absolute;
			right: 5px;
			top: 5px;
		}
	}
	.div-box-content .empty-layout {
		/deep/ .dv-layout-content {
			justify-content: center;
			align-items: center;
		}
	}
	.div-box-content .empty-link {
		cursor: pointer;
		font-size: 16px;
		color: rgba(0,0,0, .3);
		&:hover {
			color: rgba(61,137,255, .9);
		}
	}
	.div-box-content:hover>.dv-more-menu{
		display: block;
	}
	.div-box-content:hover>.dv-resize{
		display: block;
	}
</style>
