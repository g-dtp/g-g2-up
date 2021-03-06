import Chart from './chart'
import Ui from './ui'
import DvBox from './up/dv-box'
import DvEdit from './up/dv-edit'
import DvPreview from './up/dv-preview'
import DvReport from './up/dv-report'
import DvMagnet from './up/dv-magnet'
import DvMagnetEdit from './up/dv-magnet-edit'
import DvMoveShadow from './up/tools/dv-move-shadow'
import G2 from '@antv/g2'
import { ChartConfig, ChartConfigMap, UiConfig, DefaultStyleConfig, G2Table } from './config'
import Theme from './theme/index.js'
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
	G2Table,
	ChartConfig,
	ChartConfigMap,
	UiConfig,
	DefaultStyleConfig,
	Theme,
	G2,
	DvBox,
	DvEdit,
	DvMagnet,
	DvMagnetEdit,
	DvMoveShadow,
	DvPreview,
	DvReport
}
