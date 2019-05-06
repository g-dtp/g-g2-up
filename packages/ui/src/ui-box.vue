<template lang='pug'>
	.ui-box(:style="{'flex-direction': direction}")
		slot
</template>

<script>
	export default {
		name: 'ui-box',
		props: {
			direction: {
				type: String,
				default: 'row'
			}
		}
	}
</script>
<style lang="scss" scoped>
	.ui-box {
		padding: 5px;
		display: flex;
		box-sizing: border-box;
		border: 1px dashed #dddddd;
	}
</style>
d
