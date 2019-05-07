const ChartConfig = [
	{ id: '1010', name: 'g2-bar', icon: 'icon-chart-bar-v', tooltip: '柱形图', legend: 1 },
	{ id: '1011', name: 'g2-bar-h', icon: 'icon-chart-bar-h', tooltip: '柱形图(水平)', legend: 1 },
	{ id: '1020', name: 'g2-bar-dodge', icon: 'icon-chart-dodge-v', tooltip: '分组柱形图' },
	{ id: '1021', name: 'g2-bar-dodge-h', icon: 'icon-chart-dodge-h', tooltip: '分组柱形图(水平)' },
	{ id: '1030', name: 'g2-bar-stack', icon: 'icon-chart-stack-v', tooltip: '堆叠柱形图' },
	{ id: '1031', name: 'g2-bar-stack-h', icon: 'icon-chart-stack-h', tooltip: '堆叠柱形图(水平)' },
	{ id: '1040', name: 'g2-pie', icon: 'icon-chart-pie', tooltip: '饼状图' },
	{ id: '1041', name: 'g2-ring', icon: 'icon-chart-pie-ring', tooltip: '环形图' },
	{ id: '1050', name: 'g2-line', icon: 'icon-chart-line', tooltip: '折线图' },
	{ id: '1060', name: 'g2-area', icon: 'icon-chart-line-area', tooltip: '面积图' },
	{ id: '1070', name: 'g2-radar', icon: 'icon-chart-radar', tooltip: '雷达图' },
	{ id: '1080', name: 'g2-funnel', icon: 'icon-chart-funnel', tooltip: '漏斗图' }
]

const UiConfig = [
	{ id: 101, name: 'ui-label', icon: 'icon-ui-label', tooltip: '文本', width: 200, height: 40 },
	{ id: 102, name: 'ui-tooltip', icon: 'icon-ui-remark', tooltip: '备注', width: 20, height: 20 }
]

const LayoutConfig = [
	{ id: 101, name: 'ui-box', icon: 'icon-ui-box', tooltip: '布局容器', width: 100, height: 100 },
	{ id: 102, name: 'ui-box-h', icon: 'icon-ui-HBox', tooltip: '水平布局容器', width: 100, height: 100 },
	{ id: 103, name: 'ui-box-v', icon: 'icon-ui-VBox', tooltip: '垂直布局容器', width: 100, height: 100 }
]

export {
	ChartConfig,
	UiConfig,
	LayoutConfig
}
