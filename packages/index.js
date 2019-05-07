import Chart from './chart'
import Ui from './ui'
import Layout from './layout'
import DvBox from './up/dv-box'
import G2 from '@antv/g2'
import { ChartConfig, UiConfig } from './config'
import Theme from './theme/index.js'

const components = Object.values(Chart)
const uiComponents = Object.values(Ui)
const layoutComponents = Object.values(Layout)
const install = function (Vue) {
	if (install.installed) return
	components.map(component => Vue.component(component.name, component))
	uiComponents.map(component => Vue.component(component.name, component))
	layoutComponents.map(component => Vue.component(component.name, component))
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
	DvBox
}
