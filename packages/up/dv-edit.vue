<template lang='pug'>
	vue-draggable-resizable.dv-edit()
		dv-chart(v-if="widget.category == 0" :widget ="widget" :class="[layoutClass]")
		dv-ui(v-else-if="widget.category == 1" :widget ="widget" :class="[layoutClass]")
</template>

<script>
	import { Drop } from 'vue-drag-drop'
	import DvChart from './dv-chart'
	import DvLayout from './dv-layout'
	import DvUi from './dv-ui'
	import DvEdit from './dv-edit'
	import Vue from 'vue'
	import VueDraggableResizable from 'vue-draggable-resizable'
	import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
	Vue.component('drop', Drop)
	Vue.component('vue-draggable-resizable', VueDraggableResizable)
	export default {
		name: 'dv-edit',
		inject: ['layout'],
		components: { DvChart, DvUi, DvLayout, DvEdit },
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
		methods: {
			ondrop () {}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-edit {
		background: transparent;
		$size: 4px;
		/deep/ .handle {
			width: 8px;
			height: 8px;
			border: 1px solid #BFBFBF;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.10);
			z-index: 999;

			&:hover {
				border: 1px solid #3D89FF;
			}

			&.handle-tl {
				top: -$size;
				left: -$size;
			}

			&.handle-tm {
				top: -$size;
			}

			&.handle-tr {
				right: -$size;
				top: -$size;
			}

			&.handle-mr {
				right: -$size;
			}

			&.handle-br {
				right: -$size;
				bottom: -$size;
			}

			&.handle-bm {
				bottom: -$size;
			}

			&.handle-bl {
				bottom: -$size;
				left: -$size;
			}

			&.handle-ml {
				left: -$size;
			}
		}
	}
</style>
