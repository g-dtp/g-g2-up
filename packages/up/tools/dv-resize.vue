<template lang='pug'>
	.dv-resize(@mousedown.stop="onStop")
</template>

<script>
	export default {
		name: 'dv-resize',
		data () {
			return {
				startX: 0,
				startY: 0,
				moveX: 0,
				moveY: 0
			}
		},
		mounted () {

		},
		methods: {
			onStop (e) {
				e.stopPropagation()
				e.preventDefault()
				window.addEventListener('mousemove', this.onMove)
				window.addEventListener('mouseup', this.onEnd)
				this.startX = e.screenX
				this.startY = e.screenY
				this.$emit('start-resize')
			},
			onMove (e) {
				e.stopPropagation()
				e.preventDefault()
				this.moveX = e.screenX
				this.moveY = e.screenY
				this.$emit('resizing', {
					dx: this.moveX - this.startX,
					dy: this.moveY - this.startY
				})
			},
			onEnd (e) {
				window.removeEventListener('mousemove', this.onMove)
				window.removeEventListener('mouseup', this.onEnd)
				this.moveX = e.screenX
				this.moveY = e.screenY
				this.$emit('resize-end', {
					dx: this.moveX - this.startX,
					dy: this.moveY - this.startY
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-resize {
		cursor: nw-resize;
		position: absolute;
		right: 8px;
		bottom: 8px;
		width: 8px;
		height: 8px;
		border-width: 0 2px 2px 0;
		border-color: rgba(0,0,0,0.45);
		border-style: solid;
	}
</style>
