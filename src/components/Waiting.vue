<script setup lang="ts">
import type { Order } from '../types.ts'
import { fetchEventSource } from '@microsoft/fetch-event-source';
import OrderDetails from './OrderDetails.vue'
import { ref } from 'vue'
import { Auth } from "../auth.ts"
import { X_API_KEY } from "../auth.ts"
import { useRoute } from 'vue-router'

const route = useRoute()
const storeId = route.params.storeId
const orders = ref<Order[]>([])
const hasNewOrders = ref(false)
const auth = new Auth()

fetchEventSource(
  `http://localhost:3000/stores/${storeId}/orders/new`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    "X-API-KEY": X_API_KEY,
    Authorization: `Bearer ${auth.getFallback('token')}`
  },
  async onopen(response) {
    if (response.ok) {
      console.log("connected!")
      return 
    }
  },
  onmessage(msg) {
    if (msg.event === 'new-order') {
      let data = JSON.parse(msg.data)
      console.log("Dados: ")
      console.log(data.orders)
      orders.value = data.orders.map((order: any) => ({
        id: order.id,
        createdAt: new Date(order.created_at),
        state: order.state
      }))
      hasNewOrders.value = true
    } else {
      hasNewOrders.value = false
    }
  }
});
</script>

<template>
  <div>
    <h3>Waiting orders for store {{ storeId }}</h3>
    <template v-if="hasNewOrders">
      <div>
        <p>New orders!</p>
      </div>

      <ul>
        <li v-for="order in orders" :key="order.id">
          <OrderDetails :order="order" />
        </li>
      </ul>
    </template>
    <p><RouterLink to="/">Home</RouterLink></p>
  </div>
</template>
