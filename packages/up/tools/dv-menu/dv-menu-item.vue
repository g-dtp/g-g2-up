<template lang='pug'>
	.dv-menu-item
		g-icon(:iconClass="iconClass")
		span {{name}}
</template>

<script>
	export default {
		name: 'dv-menu-item',
		props: ['iconClass', 'name', 'event'],
		methods: {}
	}
</script>
<style lang="scss" scoped>
	.dv-menu-item {

	}
</style>
