<template lang='pug'>
	tr.g2-table-row(:class="{striped: index%2 != 0}")
		td(
			v-for='l,colIndex in legend'
			v-if="l && row[`_${l}`]"
			:class="[`column_l_${colIndex}`, {merged: row[`_${l}`]}]"
			:key="l"
			:rowspan="row[`_${l}`] || 1"
			:style="{display: row[`_${l}`]? 'table-cell' : 'none'}"
			) {{row[l]}}
		td(v-for='d,colIndex in dimension' v-if="d" :key="d" :class="[`column_d_${colIndex}`]") {{row[d]}}
		td(v-for='m,colIndex in measure' v-if="m" :key="m" :class="[`column_m_${colIndex}`]") {{row[m]}}
</template>

<script>
	import G2TableCell from './g2-table-cell'
	export default {
		name: 'g2-table-row',
		components: { G2TableCell },
		props: {
			list: {
				type: Array,
				default: function () {
					return []
				}
			},
			row: {
				type: Object,
				function() {
					return {}
				}
			},
			fieldMap: {
				type: Object,
				function() {
					return {}
				}
			},
			dimension: {
				type: Array,
				function() {
					return []
				}
			},
			measure: {
				type: Array,
				function() {
					return []
				}
			},
			legend: {
				type: Array,
				function() {
					return []
				}
			},
			index: {
				default: 0
			}
		},
		data() {
			return {
				i: 0
			}
		}
	}
</script>
<style lang="scss" scoped>
	.g2-table-row {
		.merged {
			background: #FFFFFF;
		}
		td {
			height: 35px;
			font-size: 14px;
			padding: 0;
			border-right: 1px solid rgba(5, 19, 50, 0.08);
			border-bottom: 1px solid rgba(5, 19, 50, 0.08);
			box-sizing: border-box;
			&:last-child {
				border-right: none
			}
		}
		&.merged {
			background: rgba(255,255,255, 1) !important;
		}
		&:last-child {
			td {
				border-bottom: none
			}
		}
		&.striped {
			background: rgba(5,19,50,0.04);
		}
		&:hover {
			td {
				/*background:  rgba(5,19,50,0.12);*/
			}
		}
	}
</style>
