const DEFAULT_COLOR = '#3D89FF'
const COLOR_PLATE_8 = ['#3D89FF', '#586889', '#9EB0CC', '#E97563', '#FEB742', '#52CBF3', '#3CB798', '#94C94B']

const COLOR_PLATE_16 = [
	'#3D89FF', '#586889', '#9EB0CC', '#E97563', '#FEB742', '#52CBF3', '#3CB798', '#94C94B',
	'#E1DD61', '#7A78DA', '#6598FF', '#4CC1EC', '#B3F1FA', '#F2B293', '#EB7A7A', '#6077C1'
]
const COLOR_PLATE_24 = [
	'#3D89FF', '#586889', '#9EB0CC', '#E97563', '#FEB742', '#52CBF3', '#3CB798', '#94C94B',
	'#E1DD61', '#7A78DA', '#6598FF', '#4CC1EC', '#B3F1FA', '#F2B293', '#EB7A7A', '#6077C1',
	'#3D89FF', '#586889', '#9EB0CC', '#E97563', '#FEB742', '#52CBF3', '#3CB798', '#94C94B'
]
const COLOR_PIE = ['#3D89FF', '#586889', '#9EB0CC', '#E97563', '#FEB742', '#52CBF3', '#3CB798', '#94C94B']
const COLOR_PIE_16 = [
	'#3D89FF', '#586889', '#9EB0CC', '#E97563', '#FEB742', '#52CBF3', '#3CB798', '#94C94B',
	'#E1DD61', '#7A78DA', '#6598FF', '#4CC1EC', '#B3F1FA', '#F2B293', '#EB7A7A', '#6077C1'
]
export default {
	defaultColor: DEFAULT_COLOR,
	colors: COLOR_PLATE_8,
	colors_16: COLOR_PLATE_16,
	colors_24: COLOR_PLATE_24,
	colors_pie: COLOR_PIE,
	colors_pie_16: COLOR_PIE_16,
	background: {
		fill: '#fff'
	},
	axis: {
		top: {
			label: {
				textStyle: {
					fill: '#999',
					fontSize: 11
				}
			}
		},
		bottom: {
			label: {
				textStyle: {
					fill: '#999',
					fontSize: 11
				},
				fontSize: 11
			},
			line: {
				stroke: '#CCC'
			},
			tickLine: {
				stroke: '#CCC'
			}
		},
		left: {
			label: {
				textStyle: {
					fill: '#999',
					fontSize: 11
				}
			},
			line: {
				stroke: '#CCC'
			},
			tickLine: {
				stroke: '#CCC'
			},
			grid: {
				align: 'left',
				zIndex: -1,
				lineStyle: {
					stroke: '#CCC',
					lineWidth: 1,
					lineDash: [4, 4]
				},
				hideFirstLine: true
			}
		},
		right: {
			label: {
				textStyle: {
					fill: '#999',
					fontSize: 11
				}
			}
		}
	},
	shape: {
		point: {
			lineWidth: 1,
			fill: DEFAULT_COLOR,
			radius: 4
		},
		hollowPoint: {
			fill: '#fff',
			lineWidth: 1,
			stroke: DEFAULT_COLOR,
			radius: 3
		},
		interval: {
			lineWidth: 0,
			fill: DEFAULT_COLOR,
			fillOpacity: 1
		},
		hollowInterval: {
			fill: '#fff',
			stroke: DEFAULT_COLOR,
			fillOpacity: 0,
			lineWidth: 2
		},
		area: {
			lineWidth: 0,
			fill: DEFAULT_COLOR,
			fillOpacity: 0.5
		},
		polygon: {
			lineWidth: 0,
			fill: DEFAULT_COLOR,
			fillOpacity: 1
		},
		hollowPolygon: {
			fill: '#fff',
			stroke: DEFAULT_COLOR,
			fillOpacity: 0,
			lineWidth: 2
		},
		hollowArea: {
			fill: '#fff',
			stroke: DEFAULT_COLOR,
			fillOpacity: 0,
			lineWidth: 2
		},
		line: {
			stroke: DEFAULT_COLOR,
			lineWidth: 2,
			fill: null
		},
		edge: {
			stroke: DEFAULT_COLOR,
			lineWidth: 1,
			fill: null
		},
		schema: {
			stroke: DEFAULT_COLOR,
			lineWidth: 1,
			fill: null
		}
	}
}
