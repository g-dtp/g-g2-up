<template lang='pug'>
	dv-chart(v-if="widget.category == 0" :widget ="widget")
	dv-ui(v-else-if="widget.category == 1" :widget ="widget")
	dv-layout(v-else-if="widget.category == 2" :widget ="widget")
</template>

<script>
	import DvChart from './dv-chart'
	import DvLayout from './dv-layout'
	import DvUi from './dv-ui'
	export default {
		name: 'dv-box',
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

</style>
