<!-- src/components/RequestList.vue -->
<template>
  <div class="p-4 space-y-4">
    <h2 class="text-xl font-bold">All Requests</h2>

    <!-- Filter Buttons -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="option in statusOptions"
        :key="option"
        @click="selectedStatus = option"
        :class="[
          'px-3 py-1 rounded border text-sm',
          selectedStatus === option
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        ]"
      >
        {{ option === 'all' ? 'All' : capitalize(option) }}
      </button>
    </div>

    <!-- Filtered Requests -->
    <div
      v-for="request in filteredRequests"
      :key="request.id"
      class="border border-gray-300 rounded p-4"
    >
      <div class="flex justify-between items-start">
        <div>
          <p class="font-semibold">{{ request.name }} ({{ request.email }})</p>
          <p class="text-sm text-gray-700 mt-1">{{ request.message }}</p>
        </div>
        <div class="ml-4">
          <select
            v-model="request.status"
            @change="updateStatus(request.id, request.status)"
            class="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRequestsStore } from '@/stores/requests'
// Instead of this (wrong):
// import type { Request } from '@/types'

// Use this:
import type { Request as AppRequest } from '@/types'

const store = useRequestsStore()

const selectedStatus = ref<'all' | 'pending' | 'in progress' | 'completed'>('all')

const statusOptions = ['all', 'pending', 'in progress', 'completed'] as const

const filteredRequests = computed(() => {
  if (selectedStatus.value === 'all') return store.requests
  return store.requests.filter((r) => r.status === selectedStatus.value)
})

function updateStatus(id: string, status: Request['status']) {
  store.updateStatus(id, status)
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

onMounted(() => {
  store.fetchRequests()
})
</script>
