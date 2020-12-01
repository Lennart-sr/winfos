import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Dashboard from '../views/Dashboard.vue'
import Infos from '../components/Infos.vue'
import Portfolio from '../components/Portfolio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/:user',
    component: User,
    children: [
      {
        path: '/',
        component: Infos
      },
      {
        path: 'portfolio',
        component: Portfolio
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
