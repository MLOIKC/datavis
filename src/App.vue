<template>
  <div class="intro">
      <NarbarMenu></NarbarMenu>
    </div>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
import NarbarMenu from './components/NarbarMenu.vue'
export default {
    name: 'App',
    components: {
      NarbarMenu
    },
  }
</script>

<style>
body{
	margin:0;
	padding:0;
	border:0
}

</style>
