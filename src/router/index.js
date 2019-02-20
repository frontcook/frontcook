import VueRouter from 'vue-router'

import Vue from 'vue'

Vue.use(VueRouter)

const MainL = () => import('../components/MainL.vue')
const Theme = () => import('../components/Theme.vue')
const Recommend = () => import('../components/Recommend.vue')
const router = new VueRouter({
  routes: [{
    path: '/',
    component: MainL
  }, {
    path: '/theme',
    component: Theme
  }, {
    path: '/recommend',
    component: Recommend
  }]
})

export default router
