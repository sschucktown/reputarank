<template>
  <div class="p-4 space-y-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold">Clients</h1>

    <!-- Add Client Form -->
    <form @submit.prevent="submitClient" class="space-y-4 border border-gray-300 p-4 rounded">
      <h2 class="text-lg font-semibold">Add New Client</h2>

      <input
          v-model="form.name"
          type="text"
          placeholder="Client Name"
          class="w-full border border-gray-300 rounded px-3 py-2"
          required
      />

      <input
          v-model="form.email"
          type="email"
          placeholder="Client Email"
          class="w-full border border-gray-300 rounded px-3 py-2"
          required
      />

      <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Add Client
      </button>
    </form>

    <!-- Client List -->
    <div v-if="store.clients.length" class="space-y-3">
      <h2 class="text-lg font-semibold">All Clients</h2>
      <div
          v-for="client in store.clients"
          :key="client.id"
          class="p-4 border border-gray-300 rounded"
      >
        <p class="font-semibold">{{ client.name }}</p>
        <p class="text-sm text-gray-600">{{ client.email }}</p>
      </div>
    </div>

    <div v-else class="text-gray-500 italic">No clients added yet.</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useClientsStore } from '@/stores/clients'

const store = useClientsStore()

const form = reactive({
  name: '',
  email: ''
})

async function submitClient() {
  await store.addClient(form.name, form.email)
  form.name = ''
  form.email = ''
}

onMounted(() => {
  store.fetchClients()
})
</script>
