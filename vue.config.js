module.exports = {
	css: {
		extract: false
	},
	devServer: {
		proxy: {
			'/geely-dataview': {
				target: ' http://127.0.0.1:7001',
				changeOrigin: true
			}
		}
	}
}
