<template>
  <div class="p-4 max-w-2xl mx-auto">
    <NewRequestForm />
    <RequestList />
  </div>
</template>

<script setup lang="ts">
import NewRequestForm from '@/components/NewRequestForm.vue'
import RequestList from '@/components/RequestList.vue'
</script>
