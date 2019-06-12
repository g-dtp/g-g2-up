<template lang="pug">
	.move
		.move-warp
			dv-move-shadow(v-if='dragging' :position="position")
			dv-move(@dragging="onDragging" @drag-end="onDragEnd")
</template>

<script>
	import DvMove from '../../packages/up/dv-move'
	import DvMoveShadow from '../../packages/up/tools/dv-move-shadow'
	export default {
		name: 'move',
		components: { DvMove, DvMoveShadow },
		data() {
			return {
				dragging: false,
				position: ''
			}
		},
		methods: {
			onDragging(position) {
				this.dragging = true
				this.position = position
			},
			onDragEnd() {
				this.dragging = false
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
