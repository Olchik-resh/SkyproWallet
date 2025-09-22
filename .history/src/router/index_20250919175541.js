import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyExpenses from '../views/MyExpensesView.vue'
import CostAnalysis from '@/components/CostAnalysis.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/MyExpenses',
      component: MyExpenses,
    },
    {
      path: '/CostAnalysis',
      component: CostAnalysis,
    },
    {
path: 
    }
  ],
})

export default router
