<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Auth } from '../auth'

const router = useRouter()
const storeName = ref('')
const awaiting = ref(false)

function onSubmit() {
  const auth = new Auth()
  const body = {
    store: {
      name: storeName.value
    }
  }

  awaiting.value = true
  fetch('http://localhost:3000/stores', {
    method: 'POST',
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
    <h1>Create Store</h1>
    <form @submit.prevent="onSubmit">
      <label>Nome da Loja:</label>
      <input v-model="storeName" type="text" required /><br />
      <button type="submit" v-show="!awaiting">Create Store</button>
    </form>
    <p><RouterLink to="/">Home</RouterLink></p>
  </div>
  
</template>
