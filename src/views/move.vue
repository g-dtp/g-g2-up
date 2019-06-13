<template lang="pug">
	.move
		.move-warp
			dv-move-shadow(v-if='shadow' :position="position" :size="size")
			dv-move(
				@dragging="onDragging"
				@drag-end="onDragEnd"
				@resizing="onResizing"
				@resize-end="onResizeEnd")
					img(src='https://www.baidu.com/img/bd_logo1.png')
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
				position: {
					x: 0,
					y: 0
				},
				size: {
					x: 1,
					y: 1
				}
			}
		},
		methods: {
			onDragging(position) {
				this.shadow = true
				this.position = position
			},
			onDragEnd() {
				this.shadow = false
			},
			onResizing(size) {
				this.shadow = true
				this.size = size
			},
			onResizeEnd() {
				this.shadow = false
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
