<template lang='pug'>
	.dv-menu
		.dv-menu__item(@click="onMenu('edit')" )
			g-icon.icon-link-edit(iconClass="icon-link-edit")
		.dv-menu__item(@click="onShow")
			g-icon.icon-menu-more(iconClass="icon-menu-more")
		v-popover.dv-menu(placement="bottom" :open.sync="show" trigger="manual" :hideOnTargetClick="true")
			div(slot="popover")
				dv-menu-item(v-if="category == 0 && mode == 1" @click.native="onMenu('preview')" :name="!showData ? '查看数据' : '返回图表'" iconClass="icon-link-preview")
				dv-menu-item( @click.native="onMenu('delete')" name="删除" iconClass="icon-link-delete")
</template>

<script>
	import { VPopover } from 'v-tooltip'
	import DvMenuItem from './dv-menu/dv-menu-item'

	export default {
		name: 'dv-menu',
		components: { VPopover, DvMenuItem },
		props: {
			category: {
				default: '0'
			},
			showDataDefault: {
				default: false
			},
			mode: {
				default: 1
			}
		},
		data() {
			return {
				show: false,
				showData: this.showDataDefault,
				popperOptions: {}
			}
		},
		created() {
		},
		mounted() {
		},
		methods: {
			onShow() {
				this.show = !this.show
			},
			onMenu(type) {
				if (type === 'preview') {
					this.showData = !this.showData
					this.$emit(type, this.showData)
				} else if (type === 'delete') {
					this.$emit(type)
				} else if (type === 'edit') {
					this.$emit(type)
				}
				this.show = false
			}
		}
	}
</script>
<style lang="scss">
	.vue-popover-theme {
		&.popover {
			.popover-inner {
				font-size: 12px;
				color: rgba(0, 0, 0, 0.75);
				background: #ffffff;
				padding: 4px 0;
				border-radius: 5px;
				box-shadow: 0 2px 6px 0 rgba(152, 159, 167, 0.30);
			}

			.popover-arrow {
				border-color: #ffffff;
			}
		}
		.dv-menu-item {
			cursor: pointer;
			padding: 0 16px;
			line-height: 30px;
			height: 30px;
			&:hover {
				color: #3D89FF;
			}
		}

	}
</style>
<style lang="scss" scoped>
	.dv-menu {
		z-index: 99;
		font-size: 0;
		&__item {
			display: inline-block;
			width: 18px;
			height: 18px;
			margin-left: 5px;
			text-align: center;
			line-height: 18px;
			font-size: 14px;
			color: rgba(0,0,0,0.45);
			cursor: pointer;
		}
	}
</style>
