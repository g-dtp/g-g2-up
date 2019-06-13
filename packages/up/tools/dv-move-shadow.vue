<template lang="pug">
	.dv-move-shadow(:style="style")
</template>

<script>
	import Config from './move/config'
	export default {
		name: 'dv-move-shadow',
		props: {
			position: {
				type: Object,
				default: function () {
					return {
						x: 0,
						y: 0
					}
				}
			},
			size: {
				type: Object,
				default: function () {
					return {
						x: 0,
						y: 0
					}
				}
			}
		},
		computed: {
			style() {
				return {
					width: (this.size.x * Config.CELL.width) + 'px',
					height: (this.size.y * Config.CELL.height) + 'px',
					left: (this.position.x * Config.CELL.width) + 'px',
					top: (this.position.y * Config.CELL.height) + 'px'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dv-move-shadow {
		position: absolute;
		transition: transform .25s, width .25s, height .25s, left  .25s , top .25s ;
		background: rgba(0, 0, 0, 0.4);
	}
</style>
