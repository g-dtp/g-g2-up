<template lang='pug'>
	.dv-report(
		:style="boxStyle"
		:class="[{layout: widget.category == 2}, theme]"
		)
		.dv-report-content
			dv-chart(v-if="widget.category == 0" :widget ="widget" :gap="10" :forceFit="true")
			dv-ui(v-else-if="widget.category == 1" :widget ="widget" )
			dv-layout(
				v-else-if="widget.category == 2"
				:widget ="widget"
				:class="{'empty-layout': widget.children.length == 0}" :refresh="refresh")
				dv-box.child(
					v-for="subWidget in widget.children"
					:widget ="subWidget"
					)
</template>

<script>
	import DvChart from './dv-chart'
	import DvLayout from './dv-layout'
	import DvUi from './dv-ui'
	import DvBox from './dv-box'
	export default {
		name: 'dv-box',
		inject: ['layout'],
		components: { DvBox, DvChart, DvUi, DvLayout },
		data () {
			return {
				layoutClass: this.layout,
				refresh: true
			}
		},
		computed: {
			boxStyle() {
				return {
					height: this.widget.category === 2 ? 'auto' : `${this.widget.grid.height}px`
				}
			}
		},
		watch: {
			'widget.children' () {
				this.doRefresh()
			}
		},
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			},
			theme: {
				type: String,
				default: 'blue'
			}
		},
		mounted() {
			this.height = this.widget.grid.height
			window.addEventListener('resize', this.doRefresh)
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.doRefresh)
		},
		methods: {
			doRefresh: () => {
				this.refresh = false
				this.$nextTick(() => {
					this.refresh = true
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-box {
		position: relative;
		flex: none;
		width: 100%;
		padding: 5px;
		background: transparent;
		box-sizing: border-box;
		user-select: none;

		&.transition {
			transition: transform .25s, width .25s, height .25s, left  .25s , top .25s ;
		}
		&.layout {
			padding: 0;
			border: 1px dashed #dddddd;
			min-height: 180px;
			margin-bottom: 5px;
		}
		.div-box-content {
			position: relative;
			height: 100%;
			overflow: hidden;
			.child {
				flex: 1;
			}
			&.active {
				box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
			}
		}
	}
</style>
