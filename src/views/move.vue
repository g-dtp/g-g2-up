<template lang="pug">
	.move
		.move-warp
			dv-move
</template>

<script>
	import DvMove from '../../packages/up/dv-move'
	export default {
		name: 'move',
		components: { DvMove }
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
