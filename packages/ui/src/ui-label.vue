<template lang='pug'>
	.ui-label(:contenteditable="edit"
		:class={noEdit: !edit}
		tabindex='3'
		:style="style"
		@input.stop="onChange"
		placeholder="请输入文本"
		@dblclick.stop="onEdit"
		@keyup.native.stop.prevent ="stop"
		@blur="outEdit")
</template>

<script>
	export default {
		name: 'ui-label',
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			borderRadius: {
				default: 8
			},
			borderWidth: {
				default: 1
			}
		},
		data () {
			return {
				edit: false
			}
		},
		watch: {
		},
		mounted () {
			this.$el.innerText = this.widget.data.content
		},
		computed: {
			style () {
				return {
					borderRadius: `${this.borderRadius}px`,
					fontSize: `18px`,

					textAlign: 'left',
					fontWeight: 600,
					borderWidth: `${this.borderWidth}px`
				}
			}
		},
		methods: {
			stop() {

			},
			stopSome(e) {
				e.stopPropagation()
			},
			onChange (e) {
				this.widget.data.content = e.target.innerText
			},
			onEdit () {
				this.edit = true
				this.$el.focus()
				this.$el.addEventListener('mousedown', this.stopSome)
				this.$el.addEventListener('keyup', this.stopSome)
			},
			outEdit () {
				this.$el.removeEventListener('mousedown', this.stopSome)
				this.$el.removeEventListener('keyup', this.stopSome)
				this.edit = false
			}
		}
	}
</script>
<style lang="scss" scoped>
	.ui-label {
		font-family: initial;
		box-sizing: border-box;
		padding: 8px;
		background: transparent;
		width: 100%;
		height: 100%;
		/*border-color: #3D89FF;*/
		/*border-style: solid;*/
		text-align: left;
		line-height: 20px;
		overflow-y: auto;
		color: rgba(0, 0, 0, 0.85);
		&.noEdit {
			user-select:none;
		}
		&:empty:before {
			content: attr(placeholder);
			color: #bbb;
		}

		&:focus {
			content: none;
		}
	}
</style>
