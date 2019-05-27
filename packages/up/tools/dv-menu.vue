<template lang='pug'>
	v-popover.dv-menu(placement="right" :show="show" trigger="click" :hideOnTargetClick="false")
		img(src="./icon-more-menu.png")
		div(slot="popover")
			dv-menu-item(v-for='item,index in _menu' :key="index" @click.native="onMenu(item)" :name="item.name" :iconClass="item.iconClass")
</template>

<script>
	import { VPopover } from 'v-tooltip'
	import DvMenuItem from './dv-menu/dv-menu-item'
	export default {
		name: 'dv-menu',
		components: { VPopover, DvMenuItem },
		data() {
			return {
				show: true,
				popperOptions: {

				}
			}
		},
		created() {
			this._menu = [
				{
					iconClass: 'icon-link-preview',
					name: '查看数据',
					event: 'preview'
				}, {
					iconClass: 'icon-link-delete',
					name: '删除',
					event: 'delete'
				}
			]
		},
		mounted() {
		},
		methods: {
			onMenu(item) {
				this.$emit(item.event)
			}
		}
	}
</script>
<style lang="scss">
	.vue-popover-theme {
		&.popover {
			.popover-inner {
				font-size: 12px;
				color: rgba(0,0,0,0.75);
				background: #ffffff;
				padding: 4px 0;
				border-radius: 5px;
				box-shadow: 0 2px 6px 0 rgba(152,159,167,0.30);
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
		.g-icon {
			margin-right: 8px;
		}
	}
</style>
<style lang="scss" scoped>
	.dv-menu {
		width: 20px;
		height: 20px;
		z-index: 99;
		img {
			cursor: pointer;
			width: 100%;
		}

	}
</style>
