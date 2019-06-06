<template lang="pug">
	#app
		router-view
</template>

<script>
	import Vue from 'vue'
	import G2Up from 'packages/index'
	Vue.use(G2Up)
	export default {
		name: 'app'
	}
</script>

<style>
	body {
		margin: 0;
		padding: 0;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>
