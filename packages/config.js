const ChartConfig = [
	{ category: 0, id: '1010', name: 'g2-bar', icon: 'icon-chart-bar-v', tooltip: '柱形图', legend: 1, width: 260, height: 180 },
	{ category: 0, id: '1012', name: 'g2-bar-line', icon: 'icon-chart-bar-line', tooltip: '柱形图+折线', legend: 1, line: 1, width: 260, height: 180 },
	{ category: 0, id: '1011', name: 'g2-bar-h', icon: 'icon-chart-bar-h', tooltip: '柱形图(水平)', legend: 1 },
	{ category: 0, id: '1020', name: 'g2-bar-dodge', icon: 'icon-chart-dodge-v', tooltip: '分组柱形图' },
	{ category: 0, id: '1021', name: 'g2-bar-dodge-h', icon: 'icon-chart-dodge-h', tooltip: '分组柱形图(水平)' },
	{ category: 0, id: '1030', name: 'g2-bar-stack', icon: 'icon-chart-stack-v', tooltip: '堆叠柱形图' },
	{ category: 0, id: '1031', name: 'g2-bar-stack-h', icon: 'icon-chart-stack-h', tooltip: '堆叠柱形图(水平)' },
	{ category: 0, id: '1040', name: 'g2-pie', icon: 'icon-chart-pie', tooltip: '饼状图' },
	{ category: 0, id: '1041', name: 'g2-ring', icon: 'icon-chart-pie-ring', tooltip: '环形图' },
	{ category: 0, id: '1050', name: 'g2-line', icon: 'icon-chart-line', tooltip: '折线图' },
	{ category: 0, id: '1060', name: 'g2-area', icon: 'icon-chart-line-area', tooltip: '面积图' },
	{ category: 0, id: '1070', name: 'g2-radar', icon: 'icon-chart-radar', tooltip: '雷达图' },
	{ category: 0, id: '1080', name: 'g2-funnel', icon: 'icon-chart-funnel', tooltip: '漏斗图' },
	{ category: 0, id: '1090', name: 'g2-tag-cloud', icon: 'icon-chart-tag-cloud', tooltip: '词云' },
	{ category: 0, id: '1100', name: 'g2-card', icon: 'icon-chart-card', tooltip: '卡片', width: 260, height: 180, measure: 1, dimension: 0 },
	{ category: 0, id: '1110', name: 'g2-table', icon: 'icon-chart-table', tooltip: '表格', width: 520, height: 360 }
	// { category: 0, id: '1120', name: 'g2-world-map', icon: 'icon-world-map', tooltip: '世界地图', width: 520, height: 360 },
	// { category: 0, id: '1130', name: 'g2-china-map', icon: 'icon-china-map', tooltip: '中国地图', width: 520, height: 360 },
	// { category: 0, id: '1130', name: 'g2-province-map', icon: 'icon-province-map', tooltip: '省份地图', width: 520, height: 360 }

]

const UiConfig = [
	{ category: 1, id: '101', name: 'ui-label', icon: 'icon-ui-label', tooltip: '文本', width: 200, height: 40, font: true, background: true },
	{ category: 1, id: '102', name: 'ui-tooltip', icon: 'icon-ui-remark', tooltip: '备注', width: 20, height: 20, content: true, resizable: false },
	{ category: 1, id: '103', name: 'ui-image', icon: 'icon-ui-image', tooltip: '图片', width: 260, height: 180, url: true, imageLib: true }
]

const LayoutConfig = [
	{ category: 3, id: 101, name: 'ui-box', icon: 'icon-ui-box', tooltip: '布局容器', width: 100, height: 100 },
	{ category: 3, id: 102, name: 'ui-box-h', icon: 'icon-ui-HBox', tooltip: '水平布局容器', width: 100, height: 100 },
	{ category: 3, id: 103, name: 'ui-box-v', icon: 'icon-ui-VBox', tooltip: '垂直布局容器', width: 100, height: 100 }
]

const DefaultStyleConfig = {
	'ui-label': {
		color: 'rgba(0, 0, 0, 0.85)',
		fontSize: 16,
		fontFamily: '默认字体',
		background: 'rgba(255,255,255, 1)',
		textAlign: 'left',
		lineHeight: 1.2
	}
}

const ChartConfigMap = {}
ChartConfig.forEach(config => {
	ChartConfigMap[config.name] = config
})
UiConfig.forEach(config => {
	ChartConfigMap[config.name] = config
})

const G2Table = ChartConfigMap['g2-table']
export {
	G2Table,
	ChartConfig,
	ChartConfigMap,
	UiConfig,
	LayoutConfig,
	DefaultStyleConfig
}
