<template lang='pug'>
	v-popover.dv-menu(placement="right" :open.sync="show")
		img(src="./icon-more-menu.png")
		div(slot="popover")
			.dv-menu-item(@click="onMenu('preview')")
				g-icon(iconClass="icon-link-preview")
				span 查看数据
			.dv-menu-item(@click="onMenu('delete')")
				g-icon(iconClass="icon-link-delete")
				span 删除
</template>

<script>
	import { VPopover } from 'v-tooltip'
	export default {
		name: 'dv-menu',
		components: { VPopover },
		data() {
			return {
				show: false
			}
		},
		mounted() {

		},
		methods: {
			onMenu(type) {
				this.$emit(type)
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
