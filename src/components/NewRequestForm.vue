<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useRequestsStore } from '@/stores/requests'
import { useClientsStore } from '@/stores/clients'

const requestStore = useRequestsStore()
const clientStore = useClientsStore()

const form = reactive({
  name: '',
  email: '',
  message: '',
  client_id: '',
})

onMounted(() => {
  clientStore.fetchClients()
})

async function submitRequest() {
  await requestStore.createRequest(form.name, form.email, form.message, form.client_id)
  form.name = ''
  form.email = ''
  form.message = ''
  form.client_id = ''
}
</script>

<template>
  <!-- other fields... -->

  <div>
    <label class="block text-sm font-medium text-gray-700">Select Client</label>
    <select
        v-model="form.client_id"
        class="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
    >
      <option value="" disabled>Select a client</option>
      <option
          v-for="client in clientStore.clients"
          :key="client.id"
          :value="client.id"
      >
        {{ client.name }} ({{ client.email }})
      </option>
    </select>
  </div>
</template>
