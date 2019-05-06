<template lang='pug'>
	.ui-box
		component(:is="uiName"
		ref="content"
		:widget='widget'
		:name='widget.name'
		:id="widget.id")
</template>

<script>
	export default {
		name: 'ui-layout',
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			type: {
				default: 0
			},
			active: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				edit: false
			}
		},
		computed: {
			uiName () {
				return this.widget.typeName
			}
		},
		methods: {
			openMenu() {
				this.edit = !this.edit
			},
			changeSize (w, h) {
			}
		}
	}
</script>
<style lang="scss" scoped>
	.ui-box {
		position: relative;
		width: 100%;
		height: 100%;
		background: transparent;
		&.active {
			pointer-events: auto;
			box-shadow: inset 0px 0px 0px 1px #3D89FF;
		}
	}
</style>
