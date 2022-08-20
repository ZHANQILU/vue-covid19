import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/policy/:citys',
    name: 'policy',
    component: () => import('@/views/Policy.vue'),
    props: true
  },
  {
    path: '/pcr/:city',
    name: 'pcr',
    component: () => import('@/views/Pcr.vue'),
    props: true
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
