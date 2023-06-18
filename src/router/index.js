import { createRouter, createWebHashHistory } from "vue-router";

 import HelloWord from '../components/HelloWorld.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component:HelloWord
    },
    {
        path:"/about",
        component:() => import("../components/HelloWorld.vue")
    }
  ],
});

export default router

