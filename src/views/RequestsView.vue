<template>
  <div class="p-4 max-w-2xl mx-auto space-y-8">
    <section>
      <h1 class="text-2xl font-bold mb-4 text-gray-800">Submit a New Request</h1>
      <NewRequestForm />
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-4 text-gray-700">All Requests</h2>
      <RequestList />
    </section>
  </div>
</template>

<script setup lang="ts">
import NewRequestForm from '@/components/NewRequestForm.vue'
import RequestList from '@/components/RequestList.vue'
</script>
