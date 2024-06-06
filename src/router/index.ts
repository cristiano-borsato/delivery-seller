import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import StoreForm from '../components/StoreForm.vue'
import StoresList from '@/components/StoresList.vue'
import SignInForm from '@/components/SignInForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInForm
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/stores/new',
      name: 'store-form',
      component: StoreForm
    },
    {
      path: '/stores',
      name: 'stores-list',
      component: StoresList
    }
  ]
})

export default router
