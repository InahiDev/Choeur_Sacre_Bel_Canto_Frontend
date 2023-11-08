import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../views/Public.vue'

const routes = [
  {
    path: '/',
    name: 'public',
    component: PublicView
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Research.vue')
  },
  {
    path: '/admin',
    name: 'board',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
