import { createRouter, createWebHashHistory } from "vue-router";

import HelloWorld from '../components/HelloWorld.vue'
import NarbarMenu from '../components/NarbarMenu.vue'
import IntroShow from '../components/IntroShow.vue'
import WordCloud from '../components/WordCloud.vue'
import HisRemark from '../components/HisRemark.vue'
import TagCloud from '../components/TagCloud.vue'
import DynHist from '../components/DynHist.vue'
import FoecePic from '../components/FoecePic.vue'
import TangTree from '../components/TangTree.vue'
import TimeLine from '../components/TimeLine.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
    meta: { showNavbarMenu: false } 
  },
  {
    path: "/narbar",
    name: "NarbarMenu",
    component: NarbarMenu,
    meta: { showNavbarMenu: true } 
  },
  {
    path: "/intro",
    name: "IntroShow",
    component: IntroShow,
    meta: { showNavbarMenu: true } 
  },
  {
    path: "/wordcloud",
    name: "WordCloud",
    component: WordCloud,
    meta: { showNavbarMenu: true } 
  },
  {
    path: "/tagcloud",
    name: "TagCloud",
    component: TagCloud,
    meta: { showNavbarMenu: true } 
  },
  {
    path: "/remark",
    name: "HisRemark",
    component: HisRemark,
    meta: { showNavbarMenu: true } 
  },
  {
    path: "/baiduindex",
    name: "DynHist",
    component: DynHist,
    meta: { showNavbarMenu: true } 
  }
  ,
  {
    path: "/relation",
    name: "FoecePic",
    component: FoecePic,
    meta: { showNavbarMenu: true } 
  },
  {
    path: "/poems",
    name: "TangTree",
    component: TangTree,
    meta: { showNavbarMenu: true } 
  },
  {
    path: "/life",
    name: "TimeLine",
    component: TimeLine,
    meta: { showNavbarMenu: true } 
  }
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
