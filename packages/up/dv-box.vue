<template lang='pug'>
	dv-chart(v-if="widget.category == 0" :widget ="widget" :class="[layoutClass]" :style="style")
	dv-ui(v-else-if="widget.category == 1" :widget ="widget" :class="[layoutClass]" :style="style")
	dv-layout(v-else-if="widget.category == 2" :widget ="widget" :class="[layoutClass]" :style="style")
		dv-box(v-for="subWidget in widget.children" :widget ="subWidget")
</template>

<script>
	import DvChart from './dv-chart'
	import DvLayout from './dv-layout'
	import DvUi from './dv-ui'
	import DvBox from './dv-box'
	export default {
		name: 'dv-box',
		inject: ['layout'],
		components: { DvBox, DvChart, DvUi, DvLayout },
		data () {
			return {
				layoutClass: this.layout
			}
		},
		computed: {
			style () {
				return {
					left: this.widget.grid.x + 'px',
					top: this.widget.grid.y + 'px'
				}
			}
		},
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.absolute {
		position: absolute;
	}
</style>
