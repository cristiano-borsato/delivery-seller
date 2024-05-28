<script setup lang="ts">
import SignInForm from '../components/SignInForm.vue'
import SignUpForm from '../components/SignUpForm.vue'
</script>

<template>
  <main style="display: flex; align-items: center">
    <section style="flex: 1; margin-right: 50px; border: 1px solid black; padding: 10px">
      <SignInForm />
    </section>
    <section style="flex: 1; margin-left: 20px; border: 1px solid black; padding: 10px">
      <SignUpForm />
    </section>
  </main>
</template>
