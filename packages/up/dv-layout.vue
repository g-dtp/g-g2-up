<template lang='pug'>
	.dv-layout(
		@drop="onDrop"
		@dragover="allowDrop"
		ref="content"
		:widget='widget'
		:name='widget.name'
		:id="widget.id"
		)
		slot
</template>

<script>
	import DvChart from './dv-chart'
	import DvUi from './dv-ui'

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
		methods: {
			onDrop(event) {
				event.preventDefault()
				event.stopPropagation()
				console.log(/layout/, event)
			},
			allowDrop(event) {
				event.preventDefault()
				event.stopPropagation()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-layout {
		width: 100%;
		height: 100%;
	}
</style>
