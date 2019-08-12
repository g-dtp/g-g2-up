<template lang='pug'>
	.dv-magnet-edit()
		.dv-magnet-edit__content(v-if="!show")
			dv-chart.dv-edit-content(v-if="widget.category == 0" :widget ="widget" :showData="showData" :gap="0" :edit="true" :editWidth="editWidth" :editHeight="editHeight")
			dv-ui.dv-edit-content(v-else-if="widget.category == 1" :widget ="widget")
			.tools-menu
				.dv-menu__item(@click="switchShowData")
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
				editHeight: 0,
				timer: null
			}
		},
		watch: {
			'widget.data.dimension': {
				immediate: true,
				handler: function () {
					this.changeShowData()
				}
			},
			'widget.data.measure': {
				immediate: true,
				handler: function () {
					this.changeShowData()
				}
			}
		},
		mounted() {
			this.refresh()
			this.$root.$on('dv-resize', this.refresh)
			window.addEventListener('resize', this.refresh.bind(this))
		},
		beforeDestroy() {
			this.$root.$off('dv-resize', this.refresh)
			window.removeEventListener('resize', this.refresh.bind(this))
		},
		methods: {
			switchShowData () {
				this.showData = !this.showData
			},
			changeShowData () {
				this.$nextTick(() => {
					let { dimension, measure } = this.widget.data
					this.showData = dimension.length === 0 || measure.length === 0
				})
			},
			refresh() {
				this.show = true
				if (this.timer) clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.editWidth = this.$el.clientWidth - 40
					this.editHeight = this.$el.clientHeight - 40
					this.show = false
				}, 200)
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
			box-sizing: border-box;
			overflow: hidden;
			padding: 20px;
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
