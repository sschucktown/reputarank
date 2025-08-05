<template>
  <div class="mt-8 space-y-4">
    <h2 class="text-xl font-semibold text-gray-800">All Requests</h2>
    <div
        v-for="request in store.requests"
        :key="request.id"
        class="p-4 border border-gray-300 rounded"
    >
      <p class="font-bold">{{ request.name }}</p>
      <p class="text-sm">{{ request.email }}</p>
      <p class="mt-2">{{ request.message }}</p>

      <div v-if="request.clients" class="mt-2 text-sm text-gray-600 italic">
        Linked to: {{ request.clients.name }} ({{ request.clients.email }})
      </div>

      <span
          class="inline-block mt-2 px-2 py-1 text-xs rounded bg-gray-200 text-gray-700"
      >
        Status: {{ request.status }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRequestsStore } from '@/stores/requests'

const store = useRequestsStore()

onMounted(() => {
  store.fetchRequests()
})
</script>
