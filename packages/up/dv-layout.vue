<template lang='pug'>
	component.dv-layout(
		:is="widget.typeName"
		ref="content"
		:widget='widget'
		:name='widget.name'
		:id="widget.id"
		@resize.native="onresize")
		slot
		slot(name="edit-resize")
</template>

<script>
	import DvChart from './dv-chart'
	import DvUi from './dv-ui'
	import DvLayout from './dv-layout'
	import Layout from '../layout/index'

	export default {
		name: 'dv-layout',
		components: { DvChart, DvUi, DvLayout, ...Layout },
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		methods: {
			onresize (e) {
				console.log(e)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-layout {

	}
</style>
