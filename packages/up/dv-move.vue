<template lang="pug">
	.dv-move(
		:class="{transition: !change}"
		@mousedown="onMoveStart")
		.dv-move__content
			slot
			dv-resize(@resizing="onResizing" @resize-end="onResizeEnd")
</template>

<script>
	/*
	* 1, 最小单元格 分割成网格
	* 2，每个单元格的位置可以简化成 二位坐标系（X, y）, 同时用对象obj[x-y] = 格子对象
	* 3，移动时 判断新的 x-y 是否被占位置，找到当前位置上的 格子  移动到新的位置（x或者y 顺移一格）在判断新位置是否有占位 这里循环 （直到新的位置没被占用）
	* */
	import Config from './tools/move/config'
	import DvResize from './tools/dv-resize'
	export default {
		name: 'dv-move',
		components: { DvResize },
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data() {
			return {
				diffX: 0,
				diffY: 0,
				left: 0,
				top: 0,
				x: 0,
				y: 0,
				sizeX: 1,
				sizeY: 1,
				width: Config.CELL.width,
				height: Config.CELL.height,
				change: false
			}
		},
		watch: {
			'widget.grid.x' () {
				this.initPosition()
				this.$el.style.left = this.left + 'px'
			},
			'widget.grid.y' () {
				this.initPosition()
				this.$el.style.top = this.top + 'px'
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
				console.log('change-position')
				let { x, y } = this.widget.grid
				this.left = x * Config.CELL.width
				this.top = y * Config.CELL.height
			},
			initSize() {
				let { width, height } = this.widget.grid
				this.width = width * Config.CELL.width
				this.height = height * Config.CELL.height
			},
			onMoveStart(event) {
				this.change = true
				this.diffX = event.clientX - this.$el.offsetLeft
				this.diffY = event.clientY - this.$el.offsetTop
				document.addEventListener('mousemove', this.onMoving)
				document.addEventListener('mouseup', this.onEnd)
				this.$emit('drag-start')
			},
			onMoving(event) {
				let left = event.clientX - this.diffX
				let top = event.clientY - this.diffY
				if (left < 0) left = 0
				if (top < 0) top = 0
				this.$el.style.left = left + 'px'
				this.$el.style.top = top + 'px'
				this.x = Math.round(left / Config.CELL.width)
				this.y = Math.round(top / Config.CELL.height)
				this.$emit('dragging', this.getGrid())
			},
			onEnd(event) {
				this.diffX = 0
				this.diffY = 0
				this.$el.style.left = (Config.CELL.width * this.x) + 'px'
				this.$el.style.top = (Config.CELL.height * this.y) + 'px'
				document.removeEventListener('mousemove', this.onMoving)
				document.removeEventListener('mouseup', this.onEnd)
				this.$emit('drag-end', this.getGrid())
				this.change = false
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
				this.sizeX = Math.ceil(w / Config.CELL.width)
				this.sizeY = Math.ceil(h / Config.CELL.height)
				this.$emit('resizing', this.getGrid())
			},
			onResizeEnd(data) {
				this.width = (this.sizeX * Config.CELL.width)
				this.height = (this.sizeY * Config.CELL.height)
				this.$el.style.width = 	this.width + 'px'
				this.$el.style.height = this.height + 'px'
				this.$emit('resize-end', this.getGrid())
				this.change = false
			},
			getGrid() {
				return {
					x: this.x,
					y: this.y,
					width: this.sizeX,
					height: this.sizeY
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dv-move {
		position: absolute;
		background: aqua;
		user-select: none;
		&.transition {
			transition: transform .25s, width .25s, height .25s, left  .25s , top .25s ;
		}
		&__content {
			position: relative;
			height: 100%;
			.dv-resize {
				display: none;
				right: 10px;
				bottom: 10px;
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
		}
	}
</style>
