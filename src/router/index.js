import VueRouter from 'vue-router'

import Vue from 'vue'

Vue.use(VueRouter)

const MainL = () => import('../components/MainL.vue')
const Theme = () => import('../components/Theme.vue')
const Recommend = () => import('../components/Recommend.vue')

const Opensource = () => import('../components/opensource/Opensource.vue')
const list = () => import('../components/opensource/list.vue')
const detail = () => import('../components/opensource/detail.vue')
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
  }, {
    path: '/opensource',
    component: Opensource,
    children: [{
      path: '',
      component: list
    }, {
      path: 'detail/:id',
      component: detail
    }]
  }]
})

export default router
