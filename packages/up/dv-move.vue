<template lang="pug">
	.dv-move(
		:class="[{transition: !change}, {moving: change}]"
		@mousedown="onMoveStart")
		.dv-move__content(:class="{impact: widget.expectedGrid}")
			slot
				div {{x}}: {{y}}
				div {{widget.grid}}
			dv-resize(@start-resize="onStartResize" @resizing="onResizing" @resize-end="onResizeEnd")
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
			'widget.expectedGrid'(value) {
				if (value) {
					let { x, y } = this.widget.expectedGrid
					this.left = x * Config.CELL.width
					this.top = y * Config.CELL.height
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
				this.$el.style.left = this.left + 'px'
			},
			'widget.grid.y' () {
				this.initPosition()
				this.$el.style.top = this.top + 'px'
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
				console.log('change-position')
				let { x, y } = this.widget.grid
				this.x = x
				this.y = y
				this.left = x * Config.CELL.width
				this.top = y * Config.CELL.height
			},
			initSize() {
				let { width, height } = this.widget.grid
				this.sizeX = width
				this.sizeY = height
				this.width = width * Config.CELL.width
				this.height = height * Config.CELL.height
			},
			onMoveStart(event) {
				this.change = true
				this.diffX = event.clientX - this.$el.offsetLeft
				this.diffY = event.clientY - this.$el.offsetTop
				document.addEventListener('mousemove', this.onMoving)
				document.addEventListener('mouseup', this.onEnd)
				this.$emit('drag-start', this.getGrid())
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
			onEnd() {
				this.diffX = 0
				this.diffY = 0
				this.$el.style.left = (Config.CELL.width * this.x) + 'px'
				this.$el.style.top = (Config.CELL.height * this.y) + 'px'
				document.removeEventListener('mousemove', this.onMoving)
				document.removeEventListener('mouseup', this.onEnd)
				this.$emit('drag-end', this.getGrid())
				this.change = false
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
				this.sizeX = Math.ceil(w / Config.CELL.width)
				this.sizeY = Math.ceil(h / Config.CELL.height)
				this.$emit('resizing', this.getGrid())
			},
			onResizeEnd() {
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
		&__content {
			background: aqua;
			position: relative;
			height: 100%;
			&.impact {
				background: rgba(255, 0, 0, 0.8);
			}
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
