<template>
  <div>
    <h1>Edit Product</h1>
    <form @submit.prevent="updateProduct">
      <div>
        <label for="title">Title</label>
        <input id="title" v-model="product.title" />
      </div>
      <div>
        <label for="price">Price</label>
        <input id="price" v-model="product.price" />
      </div>
      <button type="submit">Save</button>
    </form>
    <button @click="goBack">Back to Store Products</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Auth } from '../auth'

const product = ref({ title: '', price: '' })
const router = useRouter()
const route = useRoute()
const storeId = route.params.storeId
const productId = route.params.productId

onMounted(() => {
  const auth = new Auth()

  fetch(`http://localhost:3000/products/${productId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${auth.getFallback('token')}`
    }
  })
    .then((response) => response.json())
    .then((data) => {      
      product.value = data
    })
    .catch((error) => {
      console.error('Error fetching product:', error)
    })
})

function updateProduct() {
  const auth = new Auth()

  // Criando um novo objeto com apenas as chaves permitidas
  const updatedProduct = {
    title: product.value.title,
    price: product.value.price,
    store_id: product.value.store_id // Certifique-se de que o ID da loja está disponível
  }

  fetch(`http://localhost:3000/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json', // Certifique-se de enviar Accept: 'application/json'
      Authorization: `Bearer ${auth.getFallback('token')}`
    },
    body: JSON.stringify({ product: updatedProduct }) // Use o objeto atualizado aqui
  })
    .then((response) => response.json())
    .then((data) => {      
      alert('Product updated successfully!')
      router.push(`/stores/${storeId}/products`)
    })
    .catch((error) => {
      console.error('Error updating product:', error)
    })
}


function goBack() {
  router.push(`/stores/${storeId}/products`)
}
</script>
