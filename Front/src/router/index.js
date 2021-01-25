import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/:user',
    component: () => import('@/views/User.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/components/Infos.vue')
      },
      {
        path: 'portfolio',
        component: () => import('@/components/Portfolio.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
})

export default router
