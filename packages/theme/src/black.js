const DEFAULT_COLOR = '#1C90D9'
const COLOR_PLATE_8 = [
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF',
	'#3436C7',
	'#F04864'
]
const COLOR_PLATE_16 = [
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF',
	'#57AD71',
	'#7564CC',
	'#8543E0',
	'#5C8EE6',
	'#13C2C2',
	'#5CA3E6',
	'#3436C7',
	'#B381E6',
	'#F04864',
	'#D598D9'
]
const COLOR_PLATE_24 = ['#1890FF',
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF',
	'#E6965C',
	'#57AD71',
	'#223273',
	'#738AE6',
	'#7564CC',
	'#8543E0',
	'#A877ED',
	'#5C8EE6',
	'#13C2C2',
	'#70E0E0',
	'#5CA3E6',
	'#3436C7',
	'#8082FF',
	'#DD81E6',
	'#F04864',
	'#FA7D92',
	'#D598D9']
const COLOR_PIE = [
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF',
	'#3436C7',
	'#223273']
const COLOR_PIE_16 = [
	'#1C90D9', '#47CEE0', '#EDA532', '#6D6AE8', '#56D4AD', '#A0F4FF',
	'#FACC14',
	'#E6965C',
	'#F04864',
	'#D66BCA',
	'#8543E0',
	'#8E77ED',
	'#3436C7',
	'#737EE6',
	'#223273',
	'#7EA2E6'
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
					fontSize: 10
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
					fontSize: 10
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
					fontSize: 10
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
					fontSize: 10
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
