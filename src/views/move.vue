<template lang="pug">
	.move
		.move-warp
			dv-move-shadow(v-if='shadow' :grid="shadowGrid")
			dv-magnet(
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
	import DvMagnet from '../../packages/up/dv-magnet'
	import DvMoveShadow from '../../packages/up/tools/dv-move-shadow'

	export default {
		name: 'move',
		components: {DvMagnet, DvMoveShadow},
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
					// 改变大小时得碰撞避让规则
					this.reset()
					this.doImpactChecking2(grid, widget)
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

			// 改变大小时得碰撞避让规则 被碰撞得避让
			doImpactChecking2(grid, widget) {
				let targets = this.impactChecking(grid, widget)
				targets.forEach(t => {
					let {x, y, height, width} = widget.grid
					let tGrid = t.grid
					let ex = tGrid.x
					let ey = tGrid.y
					if (x + width <= tGrid.x) {
						ex = grid.x + grid.width
					}
					if (y + height <= tGrid.y) {
						ey = grid.y + grid.height
					}
					t.expectedGrid = {
						x: ex,
						y: ey,
						width: t.grid.width,
						height: t.grid.height
					}
					this.impactCheckingLoop(t)
				})
				this.shadowGrid = grid
			},
			// 循环检测
			impactCheckingLoop(widget) {
				let targets = this.impactChecking(widget.expectedGrid, widget)
				targets.forEach(t => {
					let {y, height} = widget.expectedGrid
					t.expectedGrid = {
						x: t.grid.x,
						y: y + height,
						width: t.grid.width,
						height: t.grid.height
					}
					this.impactCheckingLoop(t)
				})
			},
			doImpactChecking(grid, widget) {
				// 可能碰撞到多个
				let targets = this.impactChecking(grid, widget)
				let prev
				let add = 0
				targets.forEach((t, index) => {
					prev = targets[index - 1]
					add = prev ? prev.grid.height : 0
					if (prev) {
						add = t.grid.y === prev.grid.y ? 0 : prev.grid.height
					} else {
						add = 0
					}
					if (t.grid.y >= grid.y) {
						t.expectedGrid = {
							x: t.grid.x,
							y: grid.y + grid.height + add,
							width: t.grid.width,
							height: t.grid.height
						}
						this.impactCheckingLoop(t)
					} else {
						let _grid = t.expectedGrid || t.grid
						grid.y = _grid.y + _grid.height
						// 碰撞块不移动，shadow 被再次定位到碰撞快下方
						this.doImpactChecking(grid, widget)
					}
				})
				this.shadowGrid = grid
			},
			// shadow块碰撞检测
			impactChecking(grid, widget) {
				let has = []
				this.widgets.forEach(w => {
					if (widget.id !== w.id) {
						let {x, y, width, height} = w.expectedGrid || w.grid
						if (this.rectangleCol(grid.x, grid.y, grid.width, grid.height, x, y, width, height)) {
							has.push(w)
						}
					}
				})
				return has.sort((a, b) => {
					return a.grid.y >= b.grid.y
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
