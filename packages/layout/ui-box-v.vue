<template lang='pug'>
	.ui-box-v(:style="{'flex-direction': direction}" @drop.native="ondrop")
		slot
</template>

<script>
	export default {
		name: 'ui-box-v',
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			direction: {
				type: String,
				default: 'column'
			}
		},
		methods: {
			ondrop () {
				console.log('xxxx')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.ui-box-v {
		margin: 5px;
		padding: 5px;
		display: flex;
		box-sizing: border-box;
		border: 1px dashed #dddddd;
	}
</style>
