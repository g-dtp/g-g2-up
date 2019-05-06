<template lang="pug">
	.ui-box.ui-box-v(:style="{'flex-direction': direction}")
		template(v-for='sub in widget.children')
			chart-Layout(v-if="sub.category == 1" :widget ="sub")
			ui-Layout(v-if="sub.category == 0" :widget ="sub")
</template>

<script>
	import ChartLayout from './chart-layout'
	import UiLayout from './ui-layout'
	export default {
		name: 'ui-box',
		components: { ChartLayout, UiLayout },
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			direction: {
				type: String,
				default: 'row'
			}
		}
	}
</script>

<style scoped>

</style>
