<script setup lang="ts">
import type { Order } from '../types.ts'
import { ref } from 'vue'

defineProps<{
  order?: Order
}>()
</script>

<template>
  <main>
    <h2>Order {{order?.id}} [{{order?.createdAt.toLocaleDateString()}}] {{order?.state}}</h2>
  </main>
</template>