<template lang='pug'>
	img.ui-image(v-if="url" :src="url")
	.ui-image.empty(v-else)
		g-icon(:iconClass="`icon-default-${widget.typeName}`")
</template>

<script>
	export default {
		name: 'ui-image',
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data() {
			return {
				url: ''
			}
		},
		mounted () {
			this.url = this.widget.data.picUrl
		},
		watch: {
			'widget.data.picUrl' () {
				this.url = this.widget.data.picUrl
			}
		}
	}
</script>
<style lang="scss" scoped>
	.ui-image {
		width: 100%;
		height: 100%;
		object-fit: scale-down;
	}
	.empty {
		background: rgba(255, 255, 255, 0.9);
		text-align: center;
		font-size: 12px;
		height: 100%;
		flex: auto;
		display: flex;
		align-items: center;
		justify-content: center;

		/deep/ .icon {
			width: 30%;
			height: 30%;
		}
	}
</style>
