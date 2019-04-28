import Chart from './chart'
import Ui from './ui'

import { ChartConfig, UiConfig } from './config'
import Theme from './theme/index'

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
	Theme
}
