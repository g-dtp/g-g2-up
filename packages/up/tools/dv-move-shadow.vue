<template lang="pug">
	.dv-move-shadow(:style="style")
		.dv-move-shadow__content
</template>

<script>
	import Config from './move/config'
	export default {
		name: 'dv-move-shadow',
		props: {
			grid: {
				type: Object,
				default: function () {
					return {
						x: 0,
						y: 0,
						width: Config.CELL.width,
						height: Config.CELL.height
					}
				}
			}
		},
		computed: {
			style() {
				return {
					width: (this.grid.width) + 'px',
					height: (this.grid.height) + 'px',
					left: (this.grid.x) + 'px',
					top: (this.grid.y) + 'px'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dv-move-shadow {
		position: absolute;
		transition: transform .25s, width .25s, height .25s, left  .25s , top .25s ;
		background: transparent;
		padding: 5px;
		box-sizing: border-box;
		&__content {
			height: 100%;
			background: rgba(0, 0, 0, 0.2);
		}
	}
</style>
