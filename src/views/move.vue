<template lang="pug">
	.move
		.move-warp
			dv-move-shadow(v-if='shadow' :grid="grid")
			dv-move(
				v-for="widget,index in widgets"
				:widget="widget"
				:key="index"
				@drag-start="onDragStart"
				@dragging="onDragging(...arguments, widget)"
				@drag-end="onDragEnd(...arguments, widget)"
				@resize-start="onResizeStart"
				@resizing="onResizing(...arguments, widget)"
				@resize-end="onResizeEnd(...arguments, widget)")
</template>

<script>
	import DvMove from '../../packages/up/dv-move'
	import DvMoveShadow from '../../packages/up/tools/dv-move-shadow'

	export default {
		name: 'move',
		components: {DvMove, DvMoveShadow},
		data() {
			return {
				shadow: false,
				grid: {
					x: -1,
					y: -1,
					width: 0,
					height: 0
				},
				size: {
					x: 1,
					y: 1
				},
				widgets: [
					{
						id: 1,
						grid: {
							height: 1,
							width: 1,
							x: 0,
							y: 0
						}
					},
					{
						id: 2,
						grid: {
							height: 2,
							width: 2,
							x: 1,
							y: 1
						}
					}
				]
			}
		},
		mounted() {
		},
		methods: {
			onDragStart(grid) {
				console.log(grid)
				this.grid = grid
			},
			onDragging(grid, widget) {
				this.shadow = true
				if (this.grid.x !== grid.x || this.grid.y !== grid.y) {
					// 当前位置 是否已经被占位
					let target = this.impactChecking(grid, widget)
					if (target) {
						let { y, height } = target.grid
						if (y === grid.y) {
							target.grid.y = y + grid.height
						} else {
							grid.y = y + height
						}
					}
					this.grid = grid
				}
			},
			onDragEnd(grid, widget) {
				widget.grid.x = this.grid.x
				widget.grid.y = this.grid.y
				this.shadow = false
			},
			onResizeStart(grid) {
				this.grid = grid
			},
			onResizing(grid, widget) {
				this.shadow = true
				if (this.grid.width !== grid.width || this.grid.height !== grid.height) {
					let target = this.impactChecking(grid, widget)
					if (target) {
						target.grid.y = grid.y + grid.height
					}
					this.grid = grid
				}

			},
			onResizeEnd() {
				this.shadow = false
			},
			// shadow块碰撞检测
			impactChecking(grid, widget) {
				return this.widgets.find(item => {
					if (widget.id === item.id) return false
					let { x, y, width, height } = item.grid
					let endX = x + width - 1
					let endY = y + height - 1
					let gridEndX = grid.x + grid.width - 1
					let gridEndY = grid.y + grid.height - 1
					return (grid.x >= x && grid.x < endX) && (grid.y >= item.grid.y && grid.y < endY)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.move {
		width: 100vw;
		height: 100vh;
		background: #ddd;
		overflow: hidden;

		.move-warp {
			position: relative;
			width: 100%;
			height: 100%;
			background: #fff;
			overflow: auto;
		}
	}
</style>
