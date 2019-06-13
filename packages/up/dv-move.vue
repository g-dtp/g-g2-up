<template lang="pug">
	.dv-move(@mousedown="onMoveStart")
</template>

<script>
	/*
	* 1, 最小单元格 分割成网格
	* 2，每个单元格的位置可以简化成 二位坐标系（X, y）, 同时用对象obj[x-y] = 格子对象
	* 3，移动时 判断新的 x-y 是否被占位置，找到当前位置上的 格子  移动到新的位置（x或者y 顺移一格）在判断新位置是否有占位 这里循环 （直到新的位置没被占用）
	* */
	export default {
		name: 'dv-move',
		data() {
			return {
				diffX: 0,
				diffY: 0
			}
		},
		methods: {
			onMoveStart(event) {
				this.diffX = event.clientX - this.$el.offsetLeft
				this.diffY = event.clientY - this.$el.offsetTop
				document.addEventListener('mousemove', this.onMoving)
				document.addEventListener('mouseup', this.onEnd)
				this.$emit('drag-start')
			},
			onMoving(event) {
				let left = event.clientX - this.diffX
				let top = event.clientY - this.diffY
				this.$el.style.left = left + 'px'
				this.$el.style.top = top + 'px'
				let x = left - left % 240
				let y = top - top % 180
				if (x < 0) left = 0
				if (y < 0) top = 0
				this.$emit('dragging', { x, y })
			},
			onEnd(event) {
				this.diffX = 0
				this.diffY = 0
				document.removeEventListener('mousemove', this.onMoving)
				document.removeEventListener('mouseup', this.onEnd)
				this.$emit('drag-end')
			}
		}
	}
</script>

<style scoped>
	.dv-move {
		transition: transform .25s,width .25s,height .25s;
		position: absolute;
		width: 240px;
		height: 180px;
		background: aqua;
	}
</style>
