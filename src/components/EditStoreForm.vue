<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Auth } from '../auth'

const router = useRouter()
const route = useRoute()
const storeName = ref('')
const awaiting = ref(false)
const storeId = route.params.id

onMounted(() => {
  const auth = new Auth()
  fetch(`http://localhost:3000/stores/${storeId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${auth.getFallback('token')}`
    }
  })
    .then((response) => response.json())
    .then((data) => {
      storeName.value = data.name
    })
})

function onSubmit() {
  const auth = new Auth()
  const body = {
    store: {
      name: storeName.value
    }
  }

  awaiting.value = true
  fetch(`http://localhost:3000/stores/${storeId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.getFallback('token')}`
    },
    body: JSON.stringify(body)
  })
    .then((response) => {
      if (response.ok) {
        response.json().then(() => {
          awaiting.value = false
          router.push('/stores')
        })
      } else {
        response.json().then((errors) => {
          console.error(errors)
          awaiting.value = false
        })
      }
    })
    .catch((error) => {
      console.error(error)
      awaiting.value = false
    })
}
</script>

<template>
  <div>
    <h1>Edit Store</h1>
    <form @submit.prevent="onSubmit">
      <label>Nome da Loja:</label>
      <input v-model="storeName" type="text" required /><br />
      <button type="submit" v-show="!awaiting">Update Store</button>
    </form>
  </div>
</template>
