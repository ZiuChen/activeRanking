import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/ranking'
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('@/views/Ranking.vue')
  },
  {
    path: '/online',
    name: 'online',
    component: () => import('@/views/Online.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to) => {
  console.log(to)
})

export default router
