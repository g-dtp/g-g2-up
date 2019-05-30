<template lang='pug'>
	img.ui-image(:src="url")
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
</style>
