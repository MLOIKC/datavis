<template>
  <div v-if="showNavbarMenu">
    <div class="backgroundimg2"><img src="../assets/backimg.jpg" style="height:auto;width:1550px;"></div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
      text-color="#fff" active-text-color="#CCBD99" @select="handleSelect" style="font-family:FZYaoti;height: 65px;">
      <el-menu-item style="margin-left:10px">
        <div style="font-size:20px;font-weight: bold;">李白数据可视化平台</div>
      </el-menu-item>
      <el-menu-item index="/intro" style="margin-left:10px">
        <div style="font-size:16px;">个人简介</div>
      </el-menu-item>
      <el-menu-item index="/life">
        <div style="font-size:17px;">生平介绍</div>
      </el-menu-item>
      <el-menu-item index="/relation">
        <div style="font-size:17px;">人物关系</div>
      </el-menu-item>
      <el-menu-item index="/poems">
        <div style="font-size:17px;">诗词一览</div>
      </el-menu-item>
      <el-sub-menu index="/wordcloud">
        <template #title><div style="font-size:17px;">诗词统计</div></template>
        <el-menu-item index="/tagcloud"><div style="font-size:17px;font-family:FZYaoti;">诗词主题词云</div></el-menu-item>
        <el-menu-item index="/wordcloud"><div style="font-size:17px;font-family:FZYaoti;">诗词词频词云</div></el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/remark">
        <div style="font-size:17px;">历史评价</div>
      </el-menu-item>
      <el-menu-item index="/baiduindex">
        <div style="font-size:17px;">百度指数</div>
      </el-menu-item>
      <el-menu-item index="/" style="margin-left:400px">
        <div style="font-size:17px;">返回首页</div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
    
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
  router.push(key)
}

const showNavbarMenu = computed(() => {
  if (router.currentRoute.value && router.currentRoute.value.meta) {
    return router.currentRoute.value.meta.showNavbarMenu !== false;
  } else {
    return true; // 如果路由对象未定义，返回默认值 true
  }
})
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.backgroundimg2 {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: fixed;
  top: 0px;
}
</style>
    