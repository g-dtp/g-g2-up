<template lang='pug'>
	component.dv-layout(
		:is="widget.typeName"
		ref="content"
		:widget='widget'
		:name='widget.name'
		:id="widget.id")
		template(v-for="subWidget in widget.children")
			dv-chart(v-if="subWidget.category == 0" :widget ="subWidget")
			dv-ui(v-else-if="subWidget.category == 1" :widget ="subWidget")
			dv-layout(v-else-if="subWidget.category == 2" :widget ="subWidget")
</template>

<script>
	import DvChart from './dv-chart'
	import DvUi from './dv-ui'
	import DvLayout from './dv-layout'
	export default {
		name: 'dv-layout',
		components: { DvChart, DvUi, DvLayout },
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
