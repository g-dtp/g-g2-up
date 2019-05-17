import blue from './src/blue'
import black from './src/black'
import white from './src/white'

export default {
	'blue': {
		name: '吉利蓝',
		boardStyle: {
			title: {
				color: 'rgba(0, 0, 0, 0.85)'
			},
			background: 'rgba(246,247,248, 1)',
			border: '1px solid #dddddd'
		},
		...blue
	},
	'white': {
		name: '领克绿',
		boardStyle: {
			title: {
				color: 'rgba(0, 0, 0, 0.85)'
			},
			background: 'rgba(246,247,248, 1)',
			border: '1px solid #dddddd'
		},
		...white
	},
	'black': {
		name: '质感黑',
		boardStyle: {
			title: {
				color: '#D0F0FF'
			},
			background: 'rgba(13,16,26, 1)',
			border: 'none'
		},
		...black
	}
}
