<template lang='pug'>
	component.dv-layout(
		:is="widget.typeName"
		ref="content"
		:widget='widget'
		:name='widget.name'
		:id="widget.id")
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
		}
	}
</script>
<style lang="scss" scoped>
	.dv-layout {
		flex: 1;
	}
</style>
