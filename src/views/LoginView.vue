<!-- src/views/LoginView.vue -->
<template>
  <MainLayout>
    <div class="max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Log In</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="input" />
        <input v-model="password" type="password" placeholder="Password" class="input" />
        <button type="submit" class="btn">Log In</button>
      </form>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import MainLayout from '@/layouts/MainLayout.vue'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    alert(error.message)
  } else {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded w-full px-3 py-2;
}
.btn {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-semibold;
}
</style>
