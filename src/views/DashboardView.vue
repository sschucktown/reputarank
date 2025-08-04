// src/views/DashboardView.vue
<template>
  <MainLayout>
    <div class="space-y-6">
      <h2 class="text-2xl font-bold">Dashboard</h2>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white shadow rounded p-4">
          <div class="text-sm text-gray-500">Total Clients</div>
          <div class="text-2xl font-bold">24</div>
        </div>
        <div class="bg-white shadow rounded p-4">
          <div class="text-sm text-gray-500">Requests Sent</div>
          <div class="text-2xl font-bold">15</div>
        </div>
        <div class="bg-white shadow rounded p-4">
          <div class="text-sm text-gray-500">Reviews Received</div>
          <div class="text-2xl font-bold">8</div>
        </div>
        <div class="bg-white shadow rounded p-4">
          <div class="text-sm text-gray-500">Open Feedback</div>
          <div class="text-2xl font-bold">3</div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white shadow rounded p-4">
        <h3 class="text-lg font-semibold mb-2">Recent Activity</h3>
        <ul class="text-sm text-gray-700 space-y-1">
          <li>✅ Review request sent to Jane Doe</li>
          <li>⭐ New Google Review from John Smith</li>
          <li>🕓 Feedback reminder scheduled for Paul Lee</li>
        </ul>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
</script>
