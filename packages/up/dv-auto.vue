<template lang='pug'>
	dv-chart(v-if="widget.category == 0" :widget ="widget" :class="[layoutClass]" :style="style" draggable ref="chart")
	dv-ui(v-else-if="widget.category == 1" :widget ="widget" :class="[layoutClass]" :style="style" draggable)
	dv-layout(v-else-if="widget.category == 2" :widget ="widget" :class="['edit-mode']" :style="[style, size]" draggable
	@drop.native.stop="ondrop"
		@dragover.native.stop="ondragover" )
		dv-auto(v-for="subWidget in widget.children" :widget ="subWidget" :key="subWidget.id")
		dv-resize(slot="edit-resize" @resizing="onMove" @resize-end="onEnd")

</template>

<script>
	import DvChart from './dv-chart'
	import DvLayout from './dv-layout'
	import DvUi from './dv-ui'
	import DvAuto from './dv-auto'
	import DragAndDrop from '../directives/drag-and-drop'
	import DvResize from './tools/dv-resize'

	export default {
		name: 'dv-auto',
		inject: ['layout'],
		components: { DvChart, DvUi, DvLayout, DvAuto, DvResize },
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
				layoutClass: this.layout,
				grid: {
					width: '',
					height: ''
				}
			}
		},
		mounted () {
			this.grid.width = this.widget.grid.width
			this.grid.height = this.widget.grid.height
		},
		computed: {
			style () {
				return {
					left: this.widget.grid.x + 'px',
					top: this.widget.grid.y + 'px'
				}
			},
			size () {
				return {
					width: this.grid.width + 'px',
					height: this.grid.height + 'px'
				}
			}
		},
		methods: {
			ondrop (e) {
				e.preventDefault()

				console.log(e)
			},
			ondragover (e) {
				e.preventDefault()
			},
			ondrag () {
			},
			onMove (increment) {
				if (this.widget.grid.width) {
					this.grid.width = this.widget.grid.width + increment.dx
				}
				if (this.widget.grid.height) {
					this.grid.height = this.widget.grid.height + increment.dy
				}
			},
			onEnd (increment) {
				if (this.widget.grid.width) {
					this.widget.grid.width = this.grid.width = this.widget.grid.width + increment.dx
				}
				if (this.widget.grid.height) {
					this.widget.grid.height = this.grid.height = this.widget.grid.height + increment.dy
				}
				this.$root.$emit('dv-resize')
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

	.edit-mode {
		position: relative;

		&.ui-box-h {
			resize: vertical;
			overflow: auto;
		}

		&.ui-box-v {
			resize: horizontal;
			overflow: auto;
		}

		/deep/ .dv-resize {
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}
</style>
