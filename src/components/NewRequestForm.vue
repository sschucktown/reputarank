<!-- src/components/NewRequestForm.vue -->
<template>
  <form @submit.prevent="submitRequest" class="space-y-4 p-4 border border-gray-300 rounded">
    <h2 class="text-lg font-bold">Submit a New Request</h2>

    <input
      v-model="form.name"
      type="text"
      placeholder="Your Name"
      class="w-full border border-gray-300 rounded px-3 py-2"
      required
    />

    <input
      v-model="form.email"
      type="email"
      placeholder="Your Email"
      class="w-full border border-gray-300 rounded px-3 py-2"
      required
    />

    <textarea
      v-model="form.message"
      placeholder="Your Message"
      class="w-full border border-gray-300 rounded px-3 py-2"
      required
    ></textarea>

    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Submit
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRequestsStore } from '@/stores/requests'
import { useToast } from 'vue-toastification'

const store = useRequestsStore()
const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  message: '',
})

async function submitRequest() {
  try {
    await store.createRequest(form.name, form.message)
    toast.success('Request submitted!')
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (error) {
    toast.error('Something went wrong. Please try again.')
    console.error(error)
  }
}
</script>
