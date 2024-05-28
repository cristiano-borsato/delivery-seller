<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'

const router = useRouter()
const awaiting = ref(false)
const email = defineModel<string>('email')
const password = defineModel<string>('password')
const password_confirmation = defineModel<string>('password_confirmation')
const remember = defineModel<boolean>('remember', { default: true })

const onSubmit = () => {
  const auth = new Auth(remember.value)
  awaiting.value = true
  auth.signUp(
    email.value || '',
    password.value || '',
    password_confirmation.value || '',
    () => {
      awaiting.value = false
      router.push('/dashboard')
    },
    () => {
      awaiting.value = false
    }
  )
}
</script>

<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="onSubmit">
      <label><p>E-Mail:</p></label>
      <input v-model="email" type="email" /><br />
      <label><p>Senha:</p> </label>
      <input v-model="password" type="password" /><br />
      <label><p>Confirmar Senha:</p></label>
      <input v-model="password_confirmation" type="password_confirmation" /><br />
      <button type="submit" v-show="!awaiting">Sign Up</button>
    </form>
  </div>
</template>
