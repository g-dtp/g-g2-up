<template lang='pug'>
	dv-chart(v-if="widget.category == 0" :widget ="widget" :class="[layoutClass]" :style="style" draggable)
	dv-ui(v-else-if="widget.category == 1" :widget ="widget" :class="[layoutClass]" :style="style" draggable)
	dv-layout(v-else-if="widget.category == 2" :widget ="widget" :class="[layoutClass]" :style="style" draggable @drop.native.stop="ondrop" @dragover.native.stop="ondragover" )
		dv-auto(v-for="subWidget in widget.children" :widget ="subWidget" :key="subWidget.id")

</template>

<script>
	import DvChart from './dv-chart'
	import DvLayout from './dv-layout'
	import DvUi from './dv-ui'
	import DvAuto from './dv-auto'
	import DragAndDrop from '../directives/drag-and-drop'
	export default {
		name: 'dv-auto',
		inject: ['layout'],
		components: { DvChart, DvUi, DvLayout, DvAuto },
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
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
		methods: {
			ondrop (e) {
				e.preventDefault()

				console.log(e)
			},
			ondragover(e) {
				e.preventDefault()
			},
			ondrag () {
			}
		},
		directives: {
			'drag-and-drop': DragAndDrop
		}
	}
</script>
<style lang="scss" scoped>
	.auto {
		flex: 1;
	}
</style>
