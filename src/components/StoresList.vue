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

function createProduct(storeId: number) {
  router.push({ path: `/stores/${storeId}/products/new` })
}

function viewOrders(storeId: number) {
  router.push({ path: `/stores/${storeId}/orders` })
}

</script>

<template>
  <div class="stores-container">
    <h1>Stores List</h1>
    <div v-if="stores.length === 0">
      <p>No stores found.</p>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th class="store-column">Store Name</th>
            <th>Store ID</th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="store in stores" :key="store.id">
            <td>{{ store.name }}</td>
            <td>{{ store.id }}</td>
            <td class="actions-column">
              <button @click="editStore(store.id)">Edit</button>
              <button @click="viewDetails(store.id)">Detalhes</button>
              <button @click="createProduct(store.id)">Criar Produto</button>
              <button @click="viewOrders(store.id)">Ver Pedidos</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <RouterLink to="/">Home</RouterLink>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.actions-column {
  min-width: 530px; /* Ajuste conforme necessário */
}

.store-column {
  min-width: 250px; /* Ajuste conforme necessário */
}

.stores-container {
  margin: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px; /* Espaço entre os botões */
}

p {
  font-size: 18px;
}
</style>