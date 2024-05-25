<script setup lang="ts">
import SignInForm from '../components/SignInForm.vue'
import SignUpForm from '../components/SignUpForm.vue'
</script>

<template>
  <main style="display: flex">
    <section style="flex: 1; margin-right: 10px">
      <SignInForm />
    </section>
    <section style="flex: 1; margin-left: 10px">
      <SignUpForm />
    </section>
  </main>
</template>
