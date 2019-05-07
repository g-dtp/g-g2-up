const path = require('path')

function resolve (dir) {
	return path.join(__dirname, dir)
}

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
	},
	configureWebpack: {
		externals: {
			'@antv/g2': '@antv/g2',
			'@antv/data-set': '@antv/data-set'
		},
		resolve: {
			alias: {
				'packages': resolve('packages')
			}
		}
	}
}
