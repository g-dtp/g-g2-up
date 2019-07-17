<template lang='pug'>
	.dv-report(
		:style="boxStyle"
		:class="[{layout: widget.category == 2}, theme]"
		)
		.dv-report-content
			dv-chart(v-if="widget.category == 0" :widget ="widget" :gap="10" :forceFit="true")
			dv-ui(v-else-if="widget.category == 1" :widget ="widget" )
			dv-layout.report-dv-layout(
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
			window.addEventListener('resize', this.doRefresh.bind(this))
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.doRefresh.bind(this))
		},
		methods: {
			doRefresh(){
				this.refresh = false
				this.$nextTick(() => {
					this.refresh = true
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dv-report {
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
		.dv-layout {
			background: transparent !important;
		}
		&.layout {
			padding: 0;
			min-height: 180px;
		}
		.dv-report-content {
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
