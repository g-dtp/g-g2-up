const DEFAULT_COLOR = '#1C90D9'
const COLOR_PLATE_8 = [
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF', '#FA7F50', '#FFB649'
]
const COLOR_PLATE_16 = [
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF', '#FA7F50', '#FFB649',
	'#FFE549', '#9857D6', '#DB5AE6', '#33B0FF', '#6CD2B0', '#B6F07C', '#221AAF', '#0E4CC5'
]
const COLOR_PLATE_24 = [
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF', '#FA7F50', '#FFB649',
	'#FFE549', '#9857D6', '#DB5AE6', '#33B0FF', '#6CD2B0', '#B6F07C', '#221AAF', '#0E4CC5',
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF', '#FA7F50', '#FFB649'
]
const COLOR_PIE = [
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF', '#FA7F50', '#FFB649'
]
const COLOR_PIE_16 = [
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF', '#FA7F50', '#FFB649',
	'#FFE549', '#9857D6', '#DB5AE6', '#33B0FF', '#6CD2B0', '#B6F07C', '#221AAF', '#0E4CC5'
]
export default {
	defaultColor: DEFAULT_COLOR,
	colors: COLOR_PLATE_8,
	colors_16: COLOR_PLATE_16,
	colors_24: COLOR_PLATE_24,
	colors_pie: COLOR_PIE,
	colors_pie_16: COLOR_PIE_16,
	background: {
		fill: '#202536'
	},
	axis: {
		top: {
			label: {
				textStyle: {
					fill: '#2A6588',
					fontSize: 11
				}
			},
			line: {
				stroke: '#383F51'
			},
			tickLine: {
				stroke: '#383F51'
			}
		},
		bottom: {
			label: {
				textStyle: {
					fill: '#2A6588',
					fontSize: 11
				}
			},
			line: {
				stroke: '#383F51'
			},
			tickLine: {
				stroke: '#383F51'
			}
		},
		left: {
			label: {
				textStyle: {
					fill: '#2A6588',
					fontSize: 11
				}
			},
			line: {
				stroke: '#383F51'
			},
			tickLine: {
				stroke: '#383F51'
			},
			grid: {
				zIndex: -1,
				lineStyle: {
					stroke: '#383F51',
					lineWidth: 1,
					lineDash: [4, 4]
				},
				hideFirstLine: true
			}
		},
		right: {
			label: {
				textStyle: {
					fill: '#2A6588',
					fontSize: 11
				}
			},
			line: {
				stroke: '#383F51'
			},
			tickLine: {
				stroke: '#383F51'
			}
		}
	},
	legend: {
		bottom: {
			textStyle: {
				fontSize: 11
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
