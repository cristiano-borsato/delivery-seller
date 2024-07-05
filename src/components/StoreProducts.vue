<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Auth } from '../auth'

const products = ref([])
const storeName = ref('')
const router = useRouter()
const route = useRoute()
const storeId = route.params.storeId

onMounted(() => {
  const auth = new Auth()

  fetch(`http://localhost:3000/stores/${storeId}/products`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${auth.getFallback('token')}`
    }
  })
    .then((response) => response.json())
    .then((data) => {      
      storeName.value = data.store.name
      products.value = data.products
    })
})

function goBack() {
  router.push('/stores')
}

function editProduct(productId: number) {
  router.push({ name: 'EditProduct', params: { storeId, productId } })
}

function createProduct() {
  router.push({ name: 'NewProduct', params: { storeId } })
}
</script>

<template>
  <div>
    <h1>Products in {{ storeName }}</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
        <button @click="editProduct(product.id)">Edit</button>
      </li>
    </ul>
    <br>
    <button @click="goBack">Back to Stores</button>
    <button @click="createProduct">Create Product</button>
  </div>
</template>
