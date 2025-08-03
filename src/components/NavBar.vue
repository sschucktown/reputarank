<template>
  <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
    <div class="text-xl font-bold text-green-700">ReputaRank</div>

    <div class="space-x-4">
      <RouterLink v-if="auth.isLoggedIn" to="/dashboard" class="link">Dashboard</RouterLink>
      <RouterLink v-if="auth.isLoggedIn" to="/profile" class="link">Profile</RouterLink>
      <RouterLink v-if="auth.isLoggedIn" to="/settings" class="link">Settings</RouterLink>

      <RouterLink v-if="!auth.isLoggedIn" to="/login" class="btn">Log In</RouterLink>
      <RouterLink v-if="!auth.isLoggedIn" to="/signup" class="btn">Sign Up</RouterLink>
      <button v-if="auth.isLoggedIn" @click="logout" class="btn">Log Out</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.signOut()
  router.push('/login')
}
</script>

<style scoped>
.link {
  @apply text-gray-700 hover:text-green-700 font-medium;
}
.btn {
  @apply bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded;
}
</style>
