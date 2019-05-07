<template lang='pug'>
	.icon-ui-tooltip(iconClass="icon-ui-tooltip" v-tooltip.right="content")
		img(src='./icon-tooltip.png')
</template>

<script>
	import Vue from 'vue'
	import Tooltip from 'vue-directive-tooltip'
	import 'vue-directive-tooltip/css/index.css'

	Vue.use(Tooltip)
	export default {
		name: 'ui-tooltip',
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
				content: this.widget.data.content
			}
		},
		watch: {
			'widget.data.content' (value) {
				this.content = value
			}
		}
	}
</script>
<style lang="scss" scoped>
	.icon-ui-tooltip {
		width: 20px;
		height: 20px;
		img {
			width: 20px;
			height: 20px;
		}
	}
</style>
