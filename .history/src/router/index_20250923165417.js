import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import AppLayout from '@/layout/AppLayout.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          children: [
            {
              path: '/my-expenses',
              component: () => import('../views/MyExpensesView.vue'),
            },
            {
              path: '/cost-analysis',
              component: () => import('../views/CostAnalysisView.vue'),
            },
          ],
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/sign-in',
          component: SignInView,
        },
        {
          path: '/sign-up',
          component: SignUpView,
        },
        {
          path: '/exit',
          component: () => import('../views/ExitModalView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('userInfo')

  // Если пользователь на корневом пути
  if (to.path === '/') {
    if (token) {
      next('/my-expenses')
    } else {
      next('/sign-in') // или /sign-up
    }
    return // обязательно return, чтобы не пошёл дальше
  }

  // Стандартная проверка авторизации
  if (to.meta.requiresAuth && !token) {
    next('/sign-in')
  } else {
    next()
  }
})

export default router
