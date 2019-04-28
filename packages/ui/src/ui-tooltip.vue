<template lang='pug'>
	g-icon.icon-ui-tooltip(v-if='!content' iconClass="icon-ui-tooltip")
	el-tooltip.ui-tooltip(v-else placement="right")
		.ui-tooltip__content(slot="content" :style="{maxWidth: '300px', lineHeight:'1.5'}") {{content}}
		g-icon.icon-ui-tooltip(iconClass="icon-ui-tooltip")
</template>

<script>
	import Vue from 'vue'
	import { Tooltip } from 'element-ui'
	import GIcon from './g-icon'

	Vue.use(Tooltip)
	export default {
		name: 'ui-tooltip',
		components: { GIcon },
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
	.ui-tooltip {
		background: transparent;
		display: inline-block;
		width: 100%;
		height: 100%;

		.ui-tooltip__content {
			max-width: 300px;
		}
	}

	.icon-ui-tooltip {
		font-size: 20px;
	}
</style>
