<!-- src/components/RequestDetails.vue -->
<template>
  <div v-if="request" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white w-full max-w-md mx-4 p-6 rounded shadow-lg relative">
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-black">
        ✕
      </button>
      <h2 class="text-xl font-semibold mb-4">Request Details</h2>
      <p><strong>Name:</strong> {{ request.name }}</p>
      <p><strong>Email:</strong> {{ request.email }}</p>
      <p class="mt-2"><strong>Message:</strong></p>
      <p class="border border-gray-200 p-2 rounded bg-gray-50">{{ request.message }}</p>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1">Status:</label>
        <select v-model="selectedStatus" class="w-full border border-gray-300 rounded px-3 py-2">
          <option value="pending">Pending</option>
          <option value="in_review">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          class="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          @click="saveStatus"
        >
          Save Status
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Request } from '@/types'
import { useRequestsStore } from '@/stores/requests'

const props = defineProps<{ request: Request | null }>()
const emit = defineEmits(['close'])

const selectedStatus = ref(props.request?.status || 'pending')
const store = useRequestsStore()

watch(
  () => props.request,
  (newVal) => {
    if (newVal) selectedStatus.value = newVal.status
  }
)

const saveStatus = async () => {
  if (props.request) {
    await store.updateStatus(props.request.id, selectedStatus.value as any)
    emit('close')
  }
}
</script>
