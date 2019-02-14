import VueRouter from 'vue-router'

import Vue from 'vue'

Vue.use(VueRouter)

const MainL = () => import('../components/MainL.vue')
const Home = () => import('../components/Home.vue')
const Theme = () => import('../components/Theme.vue')

const router = new VueRouter({
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/book',
    component: MainL
  }, {
    path: '/theme',
    component: Theme
  }]
})

export default router