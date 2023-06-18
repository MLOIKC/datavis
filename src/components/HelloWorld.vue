<template>
  <!-- <div class="hello">
    <h1>{{ msg }}</h1>

  </div> -->
  <div class="title1">
    诗仙李白
  </div>
  <div class="title2">
    行吟天下
  </div>
  <div class="button-wrapper">
    <button class="button-1" role="button" @click="gotoIntroShow()">点击一起探索李白</button>
  </div>
  <div class="backgroundimg"><img src="../assets/backimg.jpg" style="height:auto;width:1550px;"></div>
  <router-view></router-view>
</template>

<script setup>

import { useRouter } from 'vue-router'

const router = useRouter();

const gotoIntroShow=()=>{
  router.push('/intro')
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.backgroundimg {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: fixed;
  bottom: 1200px;
}

.title1 {
  font-family: "FZYaoti", cursive;
  font-size: 180px;
  margin-left: 180px;
  margin-top: 40px;
  text-shadow: 0 1px 0 #aaa, 3px 3px 0 rgb(147, 114, 64);
}

.title2 {
  font-family: "FZYaoti", cursive;
  font-size: 180px;
  margin-left: 550px;
  text-shadow: 0 1px 0 #aaa, 3px 3px 0 rgb(147, 114, 64);
}

.button-1 {
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 25px;
  padding: 0 18px;
  line-height: 60px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left:650px;
  margin-top: 100px;
}

.button-1:hover {
  background-color: #eed9c2;
}

.button-1:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .button-1 {
    min-width: 120px;
    padding: 0 25px;
  }
}
</style>
