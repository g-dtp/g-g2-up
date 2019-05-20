<template lang='pug'>
	.icon-ui-tooltip(iconClass="icon-ui-tooltip"  v-tooltip.right="content")
		img(src='./icon-tooltip.png')
</template>

<script>
	import { VTooltip } from 'v-tooltip'
	console.log(/xxxx/, VTooltip)
	export default {
		name: 'ui-tooltip',
		props: {
			widget: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data() {
			return {
				content: this.widget.data.content
			}
		},
		watch: {
			'widget.data.content'(value) {
				this.content = value
			}
		},
		directives: {
			tooltip: VTooltip
		}
	}
</script>
<style lang="scss">
	.tooltip {
		display: block !important;
		z-index: 10000;

		.tooltip-inner {
			background: black;
			color: white;
			border-radius: 5px;
			padding: 5px 10px;
		}

		.tooltip-arrow {
			width: 0;
			height: 0;
			border-style: solid;
			position: absolute;
			margin: 5px;
			border-color: black;
			z-index: 1;
		}

		&[x-placement^="top"] {
			margin-bottom: 5px;

			.tooltip-arrow {
				border-width: 5px 5px 0 5px;
				border-left-color: transparent !important;
				border-right-color: transparent !important;
				border-bottom-color: transparent !important;
				bottom: -5px;
				left: calc(50% - 5px);
				margin-top: 0;
				margin-bottom: 0;
			}
		}

		&[x-placement^="bottom"] {
			margin-top: 5px;
			.tooltip-arrow {
				border-width: 0 5px 5px 5px;
				border-left-color: transparent !important;
				border-right-color: transparent !important;
				border-top-color: transparent !important;
				top: -5px;
				left: calc(50% - 5px);
				margin-top: 0;
				margin-bottom: 0;
			}
		}

		&[x-placement^="right"] {
			margin-left: 5px;
			.tooltip-arrow {
				border-width: 5px 5px 5px 0;
				border-left-color: transparent !important;
				border-top-color: transparent !important;
				border-bottom-color: transparent !important;
				left: -5px;
				top: calc(50% - 5px);
				margin-left: 0;
				margin-right: 0;
			}
		}

		&[x-placement^="left"] {
			margin-right: 5px;

			.tooltip-arrow {
				border-width: 5px 0 5px 5px;
				border-top-color: transparent !important;
				border-right-color: transparent !important;
				border-bottom-color: transparent !important;
				right: -5px;
				top: calc(50% - 5px);
				margin-left: 0;
				margin-right: 0;
			}
		}

		&[aria-hidden='true'] {
			visibility: hidden;
			opacity: 0;
			transition: opacity .15s, visibility .15s;
		}

		&[aria-hidden='false'] {
			visibility: visible;
			opacity: 1;
			transition: opacity .15s;
		}
	}
</style>
<style lang="scss" scoped>
	.icon-ui-tooltip {
		width: 20px;
		height: 20px;

		img {
			width: 20px;
			height: 20px;
		}
	}
</style>
