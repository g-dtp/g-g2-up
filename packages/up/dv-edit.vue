<template lang='pug'>
	vue-draggable-resizable.dv-edit(
		:class="[{over: over}, theme]"
		:tabindex='tabindex'
		:grid = "[10, 10]"
		:min-width="10"
		:min-height="10"
		:x="widget.grid.x"
		:y="widget.grid.y"
		:w='widget.grid.width'
		:h='widget.grid.height'
		:draggable='draggable'
		:resizable='widget.resizable'
		:handles="['br']"
		@blur.native.stop='onblur'
		:active.sync="active"
		@click.native.stop="onStop"
		:onDragStart="onDragStartCallback"
		@dragstop="onDragStop"
		@dragging="onDragging"
		@activated="onActivated(widget)"
		@resizestop="onResizeEnd"
		@mouseenter.native="onEnter"
		@mouseleave.native="onLeave"
	)
		dv-chart.dv-edit-content(v-if="widget.category == 0" :widget ="widget" :class="[layoutClass, style]" :showData="showData")
		dv-ui.dv-edit-content(v-else-if="widget.category == 1" :widget ="widget" :class="[layoutClass, style]")
		dv-menu.dv-more-menu(:class="{over: !over}" @preview="onShowData" @delete="onDelete" :category="widget.category")
</template>

<script>
	/*
	* 绝对布局编辑器
	* */
	import { VPopover } from 'v-tooltip'
	import DvChart from './dv-chart'
	import DvUi from './dv-ui'
	import DvMenu from './tools/dv-menu'
	import Vue from 'vue'
	import VueDraggableResizable from 'vue-draggable-resizable'
	import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

	Vue.component('vue-draggable-resizable', VueDraggableResizable)
	export default {
		name: 'dv-edit',
		inject: ['layout'],
		components: { DvChart, DvUi, DvMenu, VPopover },
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			tabindex: {
				default: 0
			},
			theme: {
				type: String,
				default: 'blue'
			}
		},
		data () {
			return {
				over: false,
				showData: false,
				layoutClass: this.layout,
				active: false,
				draggable: true,
				resizable: true
			}
		},
		computed: {
			style () {
				return {}
			}
		},
		mounted () {
			this.$el.addEventListener('focus', this.onfocus, true)
			this.$el.addEventListener('blur', this.onblur, true)
			this.emitBrandScroll(this.widget.grid)
		},
		beforeDestroy () {
			if (this.timer) clearTimeout(this.timer)
			this.$el.removeEventListener('focus', this.onfocus, true)
			this.$el.removeEventListener('blur', this.onblur, true)
		},
		methods: {
			onEnter() {
				this.over = true
			},
			onLeave() {
				this.over = false
			},
			onShowData (value) {
				this.showData = value
			},
			onDelete () {
				this.$emit('delete-self', this.widget)
			},
			onResizeEnd (x, y, w, h) {
				this.widget.grid.x = x
				this.widget.grid.y = y
				this.widget.grid.width = w
				this.widget.grid.height = h
				// this.$children[0].$children[0].changeSize(w, h)
				this.emitBrandScroll(this.widget.grid)
			},
			onActivated () {
				this.$emit('change-activated', this.widget)
				this.emitBrandScroll(this.widget.grid)
			},
			onDragStop (x, y) {
				if (x < 1) x = 1
				this.widget.grid.x = x
				this.widget.grid.y = y
				this.emitBrandScroll(this.widget.grid)
			},
			onDragStartCallback (e) {
			},
			onDragging (x, y) {
				if (x <= 1) {
					this.widget.grid.x = 1
					return false
				}
				this.widget.grid.x = x
				this.widget.grid.y = y
			},
			onStop () {
			},
			onkeyup (e) {
				if (e.key === 'Backspace' || e.key === 'Delete') {
					this.$emit('delete-self', this.widget)
				}
			},
			onfocus () {
				this.$el.addEventListener('keyup', this.onkeyup, false)
			},
			onblur () {
				this.$el.removeEventListener('keyup', this.onkeyup, false)
			},
			emitBrandScroll(grid) {
				//  图表得位置或者大小发生变化， 提醒画布是否需要滚动到合适得位置
				this.$emit('grid-change', this.widget.grid)
			}
		}
	}
</script>

<style lang="scss">
	.dv-edit.resizing {
		background: rgba(5,19,50,0.16) !important;

		/deep/ .dv-edit-content {
			opacity: 0.5;
		}
	}

	.dv-edit.active {
		box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
		z-index: 999 !important;
		.handle-br {
			display: none !important;
		}
	}
	.dv-edit.over {
		.handle-br {
			display: block !important;
		}
	}

	.dv-edit:hover {
		box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
	}

	:focus {
		outline: none;
	}
</style>
<style lang="scss" scoped>
	.dv-edit {
		background: transparent;
		border: none;
		$size: 4px;

		/deep/ .handle {
			width: 8px;
			height: 8px;
			border: 1px solid #BFBFBF;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.10);
			z-index: 999;

			&:hover {
				border: 1px solid #3D89FF;
			}

			&.handle-tl {
				top: -$size;
				left: -$size;
			}

			&.handle-tm {
				top: -$size;
			}

			&.handle-tr {
				right: -$size;
				top: -$size;
			}

			&.handle-mr {
				right: -$size;
			}

			&.handle-br {
				box-shadow: none;
				background: transparent;
				right: 8px;
				bottom: 8px;
				width: 8px;
				height: 8px;
				border-width: 0 2px 2px 0;
				border-color: rgba(0,0,0,0.45);
				border-style: solid;
			}

			&.handle-bm {
				bottom: -$size;
			}

			&.handle-bl {
				bottom: -$size;
				left: -$size;
			}

			&.handle-ml {
				left: -$size;
			}
		}
		.dv-more-menu {
			position: absolute;
			top: 8px;
			right: 8px;
			&.over {
				display: none;
			}
		}

		.preview-warp {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
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
