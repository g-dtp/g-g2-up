<template lang="pug">
	.charts
		g2-world-map()
</template>

<script>

	export default {
		name: 'charts',
		data() {
			return {
				scene: ''
			}
		},
		mounted() {

		},
		methods: {
			load() {

			}
		}
	}
</script>
<style>
	.charts {
		background: #dddddd;
		width: 100vw;
		height: 100vh;
	}
</style>
