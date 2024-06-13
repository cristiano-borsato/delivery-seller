import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StoreForm from '../components/StoreForm.vue'
import StoresList from '@/components/StoresList.vue'
import SignInForm from '@/components/SignInForm.vue'
import EditStoreForm from '../components/EditStoreForm.vue'
import StoreProducts from '../components/StoreProducts.vue'
import EditProduct from '../components/EditProduct.vue'
import NewProduct from '../components/NewProduct.vue'

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
      path: '/stores/new',
      name: 'store-form',
      component: StoreForm
    },
    {
      path: '/stores',
      name: 'stores-list',
      component: StoresList
    },
    { 
      path: '/stores/:id/edit',
      name: 'stores/edit',
      component: EditStoreForm 
    },
    {
      path: '/stores/:storeId/products',
      name: 'StoreProducts',
      component: StoreProducts
    },
    {
      path: '/stores/:storeId/products/:productId/edit',
      name: 'EditProduct',
      component: EditProduct
    },
    {
      path: '/stores/:storeId/products/new',
      name: 'NewProduct',
      component: NewProduct
    }
    
  ]
})

export default router
