<template>
  <MainLayout>
    <div class="p-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {{ user?.email }}</p>
      <button @click="logout" class="btn mt-4">Logout</button>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import MainLayout from '@/layouts/MainLayout.vue'

const user = ref()
const router = useRouter()

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
})

async function logout() {
  await supabase.auth.signOut()
  await router.push('/')
}
</script>
