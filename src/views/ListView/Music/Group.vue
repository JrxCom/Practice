<template>
	<div>
		<vs-navbar square color='#F4F7F8'  center-collapsed v-model="active">
        <template #left>
          <img src="/logo2.png" alt="">
        </template>
        <vs-navbar-item :active="active == 'guide'" id="guide">
          Guide
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'docs'" id="docs">
          Documents
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'components'" id="components">
          Components
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'license'" id="license">
          license
        </vs-navbar-item>
       
      </vs-navbar>
	</div>
  </template>
  
  <script>
  export default {
	name:'group',
	data() {
		return {
			active:'guide',
		}
	},
  }
  </script>
  
  <style lang='less' scoped>
  @font-face {
  font-family: "show_date";
  src: url("../../../font/ShowDate.otf");
}
  .vs-navbar-content{
	position: relative;
	padding: 0px;
	.vs-navbar__item{
		font-size: 20px;
		font-family: 'show_date';
		min-height: 88px;
	}
  }
  </style>