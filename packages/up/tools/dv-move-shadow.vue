<template lang="pug">
	.dv-move-shadow(:style="style")
</template>

<script>
	export default {
		name: 'dv-move-shadow',
		props: {
			w: {
				default: 240
			},
			h: {
				default: 180
			},
			position: {
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
					width: this.w + 'px',
					height: this.h + 'px',
					left: this.position.x + 'px',
					top: this.position.y + 'px'
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
