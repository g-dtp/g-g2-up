<template lang='pug'>
	.dv-menu
		img(src="./icon-more-menu.png" ref='reference')
</template>

<script>
	export default {
		name: 'dv-menu',
		data() {
			return {
				show: false
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>
	.dv-menu {
		width: 20px;
		height: 20px;
		cursor: pointer;
		img {
			width: 100%;
		}
	}
</style>
