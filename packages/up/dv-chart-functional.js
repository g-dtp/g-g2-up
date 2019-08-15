export default {
	name: 'dv-chart-functional',
	functional: true,
	inject: ['axios', 'url'],
	render(createElement, context) {
		const widget = context.props.widget
		const { url, axios } = context.injections

		function load() {
			// 维度和度量都没有时不请求后台
			if (widget.data.dimension.length === 0 && widget.data.measure.length === 0) {
				this.data = []
				return
			}
			// 根父容器注入 axios
			if (!url) {
				console.error('根父容器需要注入url')
				return
			}
			axios.post(url, {
				dataModelId: widget.resourceId,
				type: widget.resourceType,
				dimensions: widget.data.dimension,
				measures: widget.data.measure,
				queryColumns: widget.data.queryColumns,
				legends: widget.data.legend
			})
				.then(res => {
				})
				.catch(() => {

				})
		}

		return createElement(
			context.props.widget.typeName,
			{
				attrs: context.props,
				props: {
					chartData: []
				}
			},
			context.children
		)
	}
}
