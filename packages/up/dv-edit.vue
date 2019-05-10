<template lang='pug'>
	vue-draggable-resizable.dv-edit(
		:tabindex='tabindex'
		:grid = "[20, 20]"
		:min-width="20"
		:min-height="20"
		:x="widget.grid.x"
		:y="widget.grid.y"
		:w='widget.grid.width'
		:h='widget.grid.height'
		:draggable='draggable'
		:resizable='resizable'
		:handles="['br']"
		@blur.native.stop='onblur'
		:active.sync="active"
		@click.native.stop="onStop"
		:onDragStart="onDragStartCallback"
		@dragstop="onDragStop"
		@dragging="onDragging"
		@activated="onActivated(widget)"
		@resizestop="onResizeEnd"
	)
		dv-chart.dv-edit-content(v-if="widget.category == 0" :widget ="widget" :class="[layoutClass, style]")
		dv-ui.dv-edit-content(v-else-if="widget.category == 1" :widget ="widget" :class="[layoutClass, style]")
</template>

<script>
	/*
	* 绝对布局编辑器
	* */
	import DvChart from './dv-chart'
	import DvLayout from './dv-layout'
	import DvUi from './dv-ui'
	import DvEdit from './dv-edit'
	import Vue from 'vue'
	import VueDraggableResizable from 'vue-draggable-resizable'
	import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

	Vue.component('vue-draggable-resizable', VueDraggableResizable)
	export default {
		name: 'dv-edit',
		inject: ['layout', 'store'],
		components: { DvChart, DvUi, DvLayout, DvEdit },
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			tabindex: {
				default: 0
			}
		},
		data () {
			return {
				layoutClass: this.layout,
				active: false,
				draggable: true,
				resizable: true,
				editStore: this.store
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
		},
		beforeDestroy () {
			if (this.timer) clearTimeout(this.timer)
			this.$el.removeEventListener('focus', this.onfocus, true)
			this.$el.removeEventListener('blur', this.onblur, true)
		},
		methods: {
			onResizeEnd (x, y, w, h) {
				this.$nextTick(() => {
					this.widget.grid.x = x
					this.widget.grid.y = y
					this.widget.grid.width = w
					this.widget.grid.height = h
					this.widget.width = w
					this.widget.height = h
					this.$children[0].$children[0].changeSize(w, h)
				})
			},
			onActivated () {
				this.editStore.activeWidget = this.widget
			},
			onDragStop (x, y) {
				if (x < 1) x = 1
				this.widget.grid.x = x
				this.widget.grid.y = y
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
					this.deleteSelf()
				}
			},
			onfocus () {
				this.$el.addEventListener('keyup', this.onkeyup, false)
			},
			onblur () {
				this.$el.removeEventListener('keyup', this.onkeyup, false)
			}
		}
	}
</script>
<style lang="scss">
	.dv-edit.resizing {
		background: rgba(0, 0, 0, 0.1) !important;

		/deep/ .dv-edit-content {
			opacity: 0.3;
		}
	}

	.dv-edit.active {
		/*box-shadow: 0 0 0 1px #3D89FF;*/
		z-index: 999 !important;
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
				right: 2px;
				bottom: 2px;
				width: 12px;
				height: 12px;
				border-width: 0 4px 4px 0;
				border-color: #231815;
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
	}
</style>
