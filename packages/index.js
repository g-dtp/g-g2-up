import Chart from './chart'
import Ui from './ui'
import G2 from '@antv/g2'
import { ChartConfig, UiConfig } from './config'
import Theme from './theme/index.js'

import ChartLayout from './up/chart-layout.vue'
import UiLayout from './up/ui-layout.vue'

const components = Object.values(Chart)
const uiComponents = Object.values(Ui)
const install = function (Vue) {
	if (install.installed) return
	components.map(component => Vue.component(component.name, component))
	uiComponents.map(component => Vue.component(component.name, component))
}
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}
export default {
	install
}
export {
	ChartConfig,
	UiConfig,
	Theme,
	G2,
	ChartLayout,
	UiLayout
}
