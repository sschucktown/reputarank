<template>
  <div class="p-4 space-y-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <!-- Request Status Summary -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div v-for="status in statusOptions" :key="status" class="bg-white shadow rounded p-4">
        <h2 class="text-sm text-gray-500 uppercase tracking-wide">{{ statusLabels[status] }}</h2>
        <p class="text-2xl font-bold">
          {{ requestCountByStatus(status) }}
        </p>
      </div>
    </div>

    <!-- Recent Requests -->
    <div class="bg-white shadow rounded p-4">
      <h2 class="text-lg font-semibold mb-4">Recent Requests</h2>
      <table class="w-full text-sm">
        <thead>
        <tr class="text-left border-b">
          <th class="py-2">Name</th>
          <th class="py-2">Email</th>
          <th class="py-2">Message</th>
          <th class="py-2">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="request in recentRequests"
            :key="request.id"
            class="border-b hover:bg-gray-50"
        >
          <td class="py-2">{{ request.name }}</td>
          <td class="py-2">{{ request.email }}</td>
          <td class="py-2 truncate max-w-xs">{{ request.message }}</td>
          <td class="py-2 capitalize">{{ request.status }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="p-4 space-y-4">
      <RequestsLineChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRequestsStore } from '@/stores/requests'
import type { RequestStatus } from '@/types'
import RequestsLineChart from '@/components/RequestsLineChart.vue'

const store = useRequestsStore()

const statusOptions: RequestStatus[] = ['pending', 'in_review', 'completed']

const statusLabels: Record<RequestStatus, string> = {
  pending: 'Pending',
  'in_review': 'In Progress',
  completed: 'Completed',
}

const requestCountByStatus = (status: RequestStatus) =>
    store.requests.filter((r) => r.status === status).length

const recentRequests = computed(() => store.requests.slice(0, 5))

onMounted(() => {
  store.fetchRequests()
})
</script>
