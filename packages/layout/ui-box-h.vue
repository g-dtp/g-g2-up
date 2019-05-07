<template lang='pug'>
	.ui-box-h(:style="{'flex-direction': direction}")
		slot
</template>

<script>
	import DvBox from '../up/dv-box'
	export default {
		name: 'ui-box-h',
		components: { DvBox },
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			direction: {
				type: String,
				default: 'row'
			}
		}
	}
</script>
<style lang="scss" scoped>
	.ui-box-h {
		margin: 5px;
		padding: 5px;
		display: flex;
		box-sizing: border-box;
		border: 1px dashed #dddddd;
	}
</style>
