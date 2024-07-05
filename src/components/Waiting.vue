<script setup lang="ts">
import type { Order } from '../types.ts'
import { fetchEventSource }
from '@microsoft/fetch-event-source';
import OrderDetails from './OrderDetails.vue'
import { ref } from 'vue'
import { Auth } from "../auth.ts"
import { X_API_KEY } from "../auth.ts"

const newOrder = ref<Order>()
const hasNewOrder = ref(false)
const auth = new Auth()

fetchEventSource (
  'http://localhost:3000/stores/3/orders/new', {
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
      console.log(data.order)
      newOrder.value = {
        id: data.order.id,
        createdAt: new Date(data.order.created_at)
      }
      hasNewOrder.value = true
    } else {
      hasNewOrder.value = false
    }
  }
});

</script>

<template>
  <div>
    <h3>waiting orders</h3>
    <template v-if="hasNewOrder">
      <div>
        <p>new order!</p>
      </div>

      <OrderDetails :order="newOrder" />
    </template>
    <p><RouterLink to="/">Home</RouterLink></p>
  </div>
</template>