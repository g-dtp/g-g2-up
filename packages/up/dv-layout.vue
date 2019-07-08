<template lang='pug'>
	.dv-layout(
		ref="content"
		:widget='widget'
		:name='widget.name'
		:id="widget.id"
		)
		.dv-layout-content
			slot
		drop.drop-cover(v-if="showDrop" @drop="onDrop")
</template>

<script>
	import DvChart from './dv-chart'
	import DvUi from './dv-ui'
	import Vue from 'vue'
	import { Drop } from 'vue-drag-drop'
	Vue.use(Drop)
	export default {
		name: 'dv-layout',
		components: { DvChart, DvUi },
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data() {
			return {
				showDrop: false
			}
		},
		mounted() {
			this.$root.$on('chart-type-drag', this.onChangeDrop)
		},
		beforeDestroy () {
			this.$root.$off('chart-type-drag', this.onChangeDrop)
		},
		methods: {
			onDrop(data, event) {
				event.preventDefault()
				event.stopPropagation()
				this.$emit('drop-layout', data)
			},
			onChangeDrop (value) {
				this.showDrop = value
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-layout {
		position: relative;
		width: 100%;
		height: 100%;
		.dv-layout-content {
			display: flex;
			.dv-box {
				flex: 1;
			}
		}
		.drop-cover {
			width: 100%;
			height: 100%;
			top: 0;
			box-shadow: inset 0px 0px 2px 2px red;
			position: absolute;
			z-index: 99;
		}
	}
</style>
