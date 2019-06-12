const DEFAULT_COLOR = '#05B8AA'
const COLOR_PLATE_8 = [
	'#00c7B2', '#364648', '#F54359', '#F2C70F', '#5F6B6D', '#8BD4EB', '#FE9566', '#FF3349'
]
const COLOR_PLATE_16 = [
	'#00c7B2', '#364648', '#F54359', '#F2C70F', '#5F6B6D', '#8BD4EB', '#FE9566', '#FF3349',
	'#FFE859', '#00DCDD', '#2F93FF', '#34BCFF', '#9DFF5B', '#397A85', '#29AAC0', '#5CF3EC'
]
const COLOR_PLATE_24 = [
	'#00c7B2', '#364648', '#F54359', '#F2C70F', '#5F6B6D', '#8BD4EB', '#FE9566', '#FF3349',
	'#FFE859', '#00DCDD', '#2F93FF', '#34BCFF', '#9DFF5B', '#397A85', '#29AAC0', '#5CF3EC',
	'#00c7B2', '#364648', '#F54359', '#F2C70F', '#5F6B6D', '#8BD4EB', '#FE9566', '#FF3349'
]
const COLOR_PIE = [
	'#00c7B2', '#364648', '#F54359', '#F2C70F', '#5F6B6D', '#8BD4EB', '#FE9566', '#FF3349'
]
const COLOR_PIE_16 = [
	'#00c7B2', '#364648', '#F54359', '#F2C70F', '#5F6B6D', '#8BD4EB', '#FE9566', '#FF3349',
	'#FFE859', '#00DCDD', '#2F93FF', '#34BCFF', '#9DFF5B', '#397A85', '#29AAC0', '#5CF3EC'
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
					stroke: '#999',
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
