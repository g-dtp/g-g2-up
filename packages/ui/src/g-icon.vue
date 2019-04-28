<template lang='pug'>
	svg.g-icon.icon(aria-hidden="true")
		use(:xlink:href="`#${iconClass}`")
</template>

<script>
	export default {
		name: 'g-icon',
		props: {
			iconClass: {
				type: String,
				default: ''
			}
		}
	}
</script>
<style lang="scss" scoped>
	.g-icon {
		width: 1em; height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
</style>
