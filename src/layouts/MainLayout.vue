<template>
  <div>
    <NavBar />
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>
