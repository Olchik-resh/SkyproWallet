import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyExpenses from '../views/MyExpenses.vue' 

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
      // Новый маршрут для MyExpenses
      path: '/MyExpenses',
      name: 'myExpenses',
      component: MyExpenses,
    },
  ],
})

export default router
