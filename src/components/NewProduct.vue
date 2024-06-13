<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Auth } from '../auth'

const product = ref({ title: '', price: '', store_id: '' })
const router = useRouter()
const route = useRoute()
const storeId = route.params.storeId

onMounted(() => {
  product.value.store_id = storeId // Definindo o store_id diretamente
})

function createProduct() {
  const auth = new Auth()

  // Criando um novo objeto com apenas as chaves permitidas
  const newProduct = {
    title: product.value.title,
    price: product.value.price,
    store_id: product.value.store_id
  }

  fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${auth.getFallback('token')}`
    },
    body: JSON.stringify({ product: newProduct })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Create response:', data)
      alert('Product created successfully!')
      router.push(`/stores/${storeId}/products`)
    })
    .catch((error) => {
      console.error('Error creating product:', error)
    })
}

function goBack() {
  router.push(`/stores/${storeId}/products`)
}
</script>


<template>
  <div>
    <h1>New Product</h1>
    <form @submit.prevent="createProduct">
      <div>
        <label for="title">Title</label>
        <input id="title" v-model="product.title" />
      </div>
      <div>
        <label for="price">Price</label>
        <input id="price" v-model="product.price" />
      </div>
      <input type="hidden" v-model="product.store_id" />
      <button type="submit">Create</button>
    </form>
    <button @click="goBack">Back to Store Products</button>
  </div>
</template>

