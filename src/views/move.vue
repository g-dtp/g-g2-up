<template lang="pug">
	.move
		.move-warp
			dv-move-shadow(v-if='shadow' :grid="grid")
			dv-move(
				v-for="widget,index in widgets"
				:widget="widget"
				:key="index"
				@dragging="onDragging(...arguments, widget)"
				@drag-end="onDragEnd(...arguments, widget)"
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
			onDragging(grid, widget) {
				this.shadow = true
				if (this.grid.x !== grid.x || this.grid.y !== grid.y) {
					// 当前位置 是否已经被占位
					let target = this.impactChecking(grid, widget)
					if (target) {
						target.grid.y += 1
					}
					this.grid = grid
				}
			},
			onDragEnd(grid, widget) {
				widget.grid.x = grid.x
				widget.grid.y = grid.y
				this.shadow = false
			},
			onResizing(grid) {
				this.shadow = true
				this.grid = grid
			},
			onResizeEnd() {
				this.shadow = false
			},
			// shadow块碰撞检测
			impactChecking(grid, widget) {
				return this.widgets.find(item => {
					if (widget.id === item.id) return false
					return item.grid.x === grid.x && item.grid.y === grid.y
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
			width: 1000px;
			height: 600px;
			background: #fff;
			margin: 100px auto;
			overflow: auto;
		}
	}
</style>
