<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Auth } from '../auth'

const stores = ref([])
const router = useRouter()

onMounted(() => {
  const auth = new Auth()
  
  fetch('http://localhost:3000/stores', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${auth.getFallback('token')}`
    }
  })
    .then((response) => response.json())
    .then((data) => {
      stores.value = data
    })
})

function editStore(storeId: number) {
  router.push({ path: `/stores/${storeId}/edit` })
}

function viewDetails(storeId: number) {
  router.push({ path: `/stores/${storeId}/products` })
}

</script>

<template>
  <div>
    <h1>Stores List</h1>
    <ul>
      <li v-for="store in stores" :key="store.id">
        {{ store.name }}
        <button @click="editStore(store.id)">Edit</button>
        <button @click="viewDetails(store.id)">Detalhes</button>
      </li>
    </ul>
  </div>
</template>
