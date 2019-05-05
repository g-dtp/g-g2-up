<template lang='pug'>
	.ui-box()
		slot
</template>

<script>
	export default {
		name: 'ui-box'
	}
</script>
<style lang="scss" scoped>
	.ui-box {
		padding: 5px;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		border: 1px dashed #dddddd;
	}
</style>
