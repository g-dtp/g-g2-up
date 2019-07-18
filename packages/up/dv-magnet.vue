<template lang='pug'>
	.dv-magnet(
		:class="[{transition: !change}, {moving: change}, theme, {edit: edit}]"
		@mouseenter.native="onEnter"
		@mouseleave.native="onLeave"
		@mousedown="onMoveStart")
		.dv-magnet__content(v-if="widget" :class="{impact: widget.expectedGrid}")
			dv-chart.dv-edit-content(v-if="widget.category == 0" :widget ="widget" :showData="showData" :gap="10")
			dv-ui.dv-edit-content(v-else-if="widget.category == 1" :widget ="widget")
			dv-menu.dv-more-menu(
				:class="{over: !over}"
				@preview="onShowData"
				@delete="onDelete"
				@edit="onEdit"
				@un-edit="closeEdit"
				:category="widget.category"
				:showDataDefault="showData"
				:mode="mode"
				)
			dv-resize(@start-resize="onStartResize" @resizing="onResizing" @resize-end="onResizeEnd")
</template>

<script>
	import Config from './tools/move/config'
	import DvResize from './tools/dv-resize'
	import DvChart from './dv-chart'
	import DvUi from './dv-ui'
	import DvMenu from './tools/dv-menu'
	export default {
		name: 'dv-magnet',
		components: { DvChart, DvResize, DvUi, DvMenu },
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
			},
			edit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				over: false,
				showData: false,
				mode: 1,
				layoutClass: this.layout,
				diffX: 0,
				diffY: 0,
				left: 0,
				top: 0,
				x: 0,
				y: 0,
				width: Config.CELL.width,
				height: Config.CELL.height,
				change: false
			}
		},
		watch: {
			'widget.expectedGrid'(value) {
				if (value) {
					let { x, y } = this.widget.expectedGrid
					this.left = x
					this.top = y
					this.$el.style.left = this.left + 'px'
					this.$el.style.top = this.top + 'px'
				} else {
					this.initPosition()
					this.$el.style.left = this.left + 'px'
					this.$el.style.top = this.top + 'px'
				}
			},
			'widget.grid.x' () {
				this.initPosition()
			},
			'widget.grid.y' () {
				this.initPosition()
			},
			'widget.grid.width' () {
				this.initSize()
				this.$el.style.width = this.width + 'px'
			},
			'widget.grid.height' () {
				this.initSize()
				this.$el.style.height = this.height + 'px'
			}
		},
		mounted() {
			this.initPosition()
			this.initSize()
			this.$el.style.width = this.width + 'px'
			this.$el.style.height = this.height + 'px'
			this.$el.style.left = this.left + 'px'
			this.$el.style.top = this.top + 'px'
		},
		methods: {
			initPosition() {
				let { x, y } = this.widget.grid
				this.x = x
				this.y = y
				this.left = x
				this.top = y
				this.$el.style.left = this.left + 'px'
				this.$el.style.top = this.top + 'px'
			},
			initSize() {
				let { width, height } = this.widget.grid
				this.width = width
				this.height = height
			},
			onMoveStart(event) {
				this.change = true
				this.diffX = event.clientX - this.$el.offsetLeft
				this.diffY = event.clientY - this.$el.offsetTop
				document.addEventListener('mousemove', this.onMoving)
				document.addEventListener('mouseup', this.onEnd)
				this.$emit('drag-start', this.getGrid())
			},
			updatePosition(event) {
				let left = event.clientX - this.diffX
				let top = event.clientY - this.diffY
				if (left < 0) left = 0
				if (top < 0) top = 0
				return { left, top }
			},
			onMoving(event) {
				let { left, top } = this.updatePosition(event)
				this.$el.style.left = left + 'px'
				this.$el.style.top = top + 'px'
				this.x = Math.round(left / Config.CELL.width) * Config.CELL.width
				this.y = Math.round(top / Config.CELL.height) * Config.CELL.height
				this.$emit('dragging', this.getGrid())
			},
			onEnd() {
				this.diffX = 0
				this.diffY = 0
				this.initPosition()
				this.$emit('drag-end', this.getGrid())
				this.change = false
				document.removeEventListener('mousemove', this.onMoving)
				document.removeEventListener('mouseup', this.onEnd)
				this.emitBrandScroll(this.widget.grid)
			},
			onStartResize () {
				this.$emit('resize-start', this.getGrid())
			},
			onResizing(data) {
				this.change = true
				let w = this.width + data.dx
				let h = this.height + data.dy
				if (w < Config.CELL.width - 20) {
					w = Config.CELL.width - 20
				}
				if (h < Config.CELL.height - 20) {
					h = Config.CELL.height - 20
				}
				this.$el.style.width = 	w + 'px'
				this.$el.style.height = h + 'px'
				let width = Math.ceil(w / Config.CELL.width - 0.1) * Config.CELL.width
				let height = Math.ceil(h / Config.CELL.height - 0.1) * Config.CELL.height
				this.$emit('resizing', {
					x: this.x,
					y: this.y,
					width,
					height
				})
			},
			onResizeEnd() {
				this.$el.style.width = 	this.width + 'px'
				this.$el.style.height = this.height + 'px'
				this.$emit('resize-end', this.getGrid())
				this.emitBrandScroll(this.widget.grid)
				this.change = false
			},
			getGrid() {
				return {
					x: this.x,
					y: this.y,
					width: this.width,
					height: this.height
				}
			},

			onEnter() {
				this.over = true
			},
			onLeave() {
				this.over = false
			},
			onShowData (value) {
				this.showData = value
			},
			changeShowData () {
				this.$nextTick(() => {
					let { dimension, measure } = this.widget.data
					this.showData = dimension.length === 0 || measure.length === 0
					this.mode = dimension.length === 0 || measure.length === 0 ? 0 : 1
				})
			},
			onDelete () {
				this.$emit('delete-self', this.widget)
			},
			onEdit () {
				this.$emit('edit-self', this.widget)
			},
			closeEdit () {
				this.$emit('un-edit-self', this.widget)
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
				this.$emit('grid-change', {
					x: this.left,
					y: this.top,
					width: this.width,
					height: this.height
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-magnet {
		position: absolute;
		padding: 5px;
		background: transparent;
		box-sizing: border-box;
		user-select: none;
		&.transition {
			transition: transform .25s, width .25s, height .25s, left  .25s , top .25s ;
		}
		&.moving {
			/*box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);*/
			z-index: 2;
		}
		&.edit {
			.dv-magnet__content {
				box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
			}
		}
		&__content {
			background: #ffffff;
			position: relative;
			height: 100%;
			overflow: hidden;
			&.impact {
				background: rgba(255, 0, 0, 0.8);
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
				top: 8px;
			}
			img {
				pointer-events: none;
				width: 100%;
				height: 100%;
				object-fit: scale-down;
			}
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
