<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <header class="bg-white shadow p-4">
      <h1 class="text-xl font-semibold">ReputaRank</h1>
    </header>

    <main class="p-6">
      <slot />
    </main>
  </div>
</template>
