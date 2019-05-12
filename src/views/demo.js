export default {
	functional: true,
	render(createElement, { props, listeners, children }) {
		console.log(/props/, props)
		return createElement(
			props.type,
			{
				attrs: props,
				on: {
					click: listeners.click
				}
			},
			children
		)
	}
}
