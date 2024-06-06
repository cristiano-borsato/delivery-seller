<script setup lang="ts">
import { RouterLink } from 'vue-router'
import UserProfile from '../components/UserProfile.vue'
</script>

<template>
  <main>
    <UserProfile />
    <RouterLink to="/stores/new">Create Store</RouterLink><br>
    <RouterLink to="/stores">My Stores</RouterLink>
  </main>
</template>