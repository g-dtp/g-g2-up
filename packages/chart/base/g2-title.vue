<template lang='pug'>
	.g2-title
		h1 {{title || '我的标题'}}
		h3(:title="subTitle") {{subTitle}}
</template>

<script>
	export default {
		name: 'g2-title',
		props: ['title', 'subTitle']
	}
</script>
<style lang="scss" scoped>
	.g2-title {
		width: 100%;
		position: absolute;
		text-align: left;
		padding: 16px;
		z-index: 2;
		box-sizing: border-box;

		h1 {
			line-height: 1.2;
			color: rgba(0, 0, 0, 0.85);
			font-size: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin: 0;
			font-weight: 500;
		}

		h3 {
			line-height: 1.2;
			font-size: 12px;
			margin: 6px 0 0 0;
			color: rgba(0,0,0,0.45);
			font-weight: 500;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
