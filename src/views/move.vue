<template lang="pug">
	.move
		.move-warp
			dv-move-shadow(v-if='shadow' :grid="shadowGrid")
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
		components: { DvMove, DvMoveShadow },
		data() {
			return {
				shadow: false,
				shadowGrid: {
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
						},
						expectedGrid: null,
						impact: false
					},
					{
						id: 2,
						grid: {
							height: 2,
							width: 2,
							x: 1,
							y: 2
						},
						expectedGrid: null,
						impact: false
					},
					{
						id: 3,
						grid: {
							height: 2,
							width: 2,
							x: 1,
							y: 0
						},
						expectedGrid: null,
						impact: false
					},
					{
						id: 4,
						grid: {
							height: 1,
							width: 1,
							x: 0,
							y: 3
						},
						expectedGrid: null,
						impact: false
					}
				]
			}
		},
		mounted() {
		},
		methods: {
			onDragStart(grid) {
				this.shadowGrid = grid
			},
			reset() {
				this.widgets.forEach(item => {
					item.expectedGrid = null
				})
			},
			onDragging(grid, widget) {
				this.shadow = true
				if (this.shadowGrid.x !== grid.x || this.shadowGrid.y !== grid.y) {
					this.reset()
					this.doImpactChecking(grid, widget)
				}
			},
			onDragEnd(grid, widget) {
				this.widgets.forEach(item => {
					if (item.expectedGrid) {
						item.grid.x = item.expectedGrid.x
						item.grid.y = item.expectedGrid.y
						item.grid.width = item.expectedGrid.width
						item.grid.height = item.expectedGrid.height
						item.expectedGrid = null
					}
				})
				widget.grid.x = this.shadowGrid.x
				widget.grid.y = this.shadowGrid.y
				widget.grid.width = this.shadowGrid.width
				widget.grid.height = this.shadowGrid.height
				this.shadow = false
			},
			onResizeStart(grid) {
				this.shadowGrid = grid
			},
			onResizing(grid, widget) {
				this.shadow = true
				if (this.shadowGrid.width !== grid.width || this.shadowGrid.height !== grid.height) {
					this.doImpactChecking(grid, widget)
				}
			},
			onResizeEnd(grid, widget) {
				this.widgets.forEach(item => {
					if (item.expectedGrid) {
						item.grid.x = item.expectedGrid.x
						item.grid.y = item.expectedGrid.y
						item.grid.width = item.expectedGrid.width
						item.grid.height = item.expectedGrid.height
						item.expectedGrid = null
					}
				})
				widget.grid.x = this.shadowGrid.x
				widget.grid.y = this.shadowGrid.y
				widget.grid.width = this.shadowGrid.width
				widget.grid.height = this.shadowGrid.height
				this.shadow = false
			},
			// 循环检测
			impactCheckingLoop(widget) {
				let target = this.impactChecking(widget.expectedGrid, widget)
				if (target) {
					let { y, height } = widget.expectedGrid
					target.expectedGrid = {
						x: target.grid.x,
						y: y + height,
						width: target.grid.width,
						height: target.grid.height
					}
					this.impactCheckingLoop(target)
				}
			},
			doImpactChecking(grid, widget) {
				let target = this.impactChecking(grid, widget)
				if (target) {
					let { y, height } = target.grid
					if (y === grid.y) {
						// shadow占据碰撞块的位置, 被碰撞块移动
						target.expectedGrid = {
							x: target.grid.x,
							y: y + grid.height,
							width: target.grid.width,
							height: target.grid.height
						}
						this.impactCheckingLoop(target)
					} else {
						grid.y = y + height
						// 碰撞块不移动，shadow 被再次定位到碰撞快下方
						this.doImpactChecking(grid, widget)
					}
				}
				this.shadowGrid = grid
			},
			// shadow块碰撞检测
			impactChecking(grid, widget) {
				return this.widgets.find(item => {
					if (widget.id === item.id) return false
					let { x, y, width, height } = item.grid
					return this.rectangleCol(grid.x, grid.y, grid.width, grid.height, x, y, width, height)
				})
			},
			// 判断两个矩形是否相交
			rectangleCol(x1, y1, w1, h1, x2, y2, w2, h2) {
				let maxX, maxY, minX, minY
				maxX = x1 + w1 >= x2 + w2 ? x1 + w1 : x2 + w2
				maxY = y1 + h1 >= y2 + h2 ? y1 + h1 : y2 + h2
				minX = x1 <= x2 ? x1 : x2
				minY = y1 <= y2 ? y1 : y2
				return ((maxX - minX) < (w1 + w2)) && ((maxY - minY) < (h1 + h2))
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
