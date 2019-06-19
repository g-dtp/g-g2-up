export function toFixed2(val) {
	val = (val * 100).toFixed(2) + '%'
	return val
}

export function toFixed(val) {
	val = (val * 100).toFixed(0) + '%'
	return val
}
