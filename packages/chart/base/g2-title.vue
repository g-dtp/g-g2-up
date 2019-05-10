<template lang='pug'>
	.g2-title
		h1 {{title || '我的标题'}}
		h3 {{title || '我的副标题'}}
</template>

<script>
	export default {
		name: 'g2-title',
		props: ['title', 'subTitle']
	}
</script>
<style lang="scss" scoped>
	.g2-title {
		position: absolute;
		text-align: left;
		padding: 10px;
		z-index: 2;
		h1 {
			line-height: 1.2;
			color: rgba(0, 0, 0, 0.85);
			font-size: 16px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin: 0;
		}
		h3 {
			line-height: 1.5;
			font-size: 12px;
			color: rgba(0,0,0,0.45);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin: 0;
		}
	}
</style>
