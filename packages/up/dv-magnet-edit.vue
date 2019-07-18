<template lang='pug'>
	.dv-magnet-edit()
		.dv-magnet-edit__content(v-if="show")
			dv-chart.dv-edit-content(v-if="widget.category == 0" :widget ="widget" :showData="showData" :gap="10" :edit="true" :editWidth="editWidth" :editHeight="editHeight")
			dv-ui.dv-edit-content(v-else-if="widget.category == 1" :widget ="widget")
			.tools-menu
				.dv-menu__item(@click="onClose")
					g-icon.icon-link-edit(iconClass="iconchexiao-b")
				.dv-menu__item
					g-icon.icon-menu-more(iconClass="icon-link-preview")
</template>

<script>
	import DvResize from './tools/dv-resize'
	import DvChart from './dv-chart'
	import DvUi from './dv-ui'
	import DvMenu from './tools/dv-menu'
	export default {
		name: 'dv-magnet-edit',
		components: { DvChart, DvResize, DvUi, DvMenu },
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			theme: {
				type: String,
				default: 'blue'
			}
		},
		data() {
			return {
				show: false,
				showData: false,
				editWidth: 0,
				editHeight: 0
			}
		},
		watch: {
		},
		mounted() {
			console.dir(this.$el)
			this.$nextTick(() => {
				this.editWidth = this.$el.clientWidth
				this.editHeight = this.$el.clientHeight
				this.show = true
			})
		},
		methods: {
			onClose() {
				this.$emit('un-edit-self', this.widget)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-magnet-edit {
		position: absolute;
		background: transparent;
		box-sizing: border-box;
		user-select: none;
		&__content {
			background: #ffffff;
			position: relative;
			height: 100%;
			overflow: hidden;
			img {
				pointer-events: none;
				width: 100%;
				height: 100%;
				object-fit: scale-down;
			}
			.tools-menu {
				z-index: 22;
				position: absolute;
				right: 5px;
				top: 8px;
			}
		}
	}
</style>
