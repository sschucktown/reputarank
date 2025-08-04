<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const mobileMenuOpen = ref(false)

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Clients', path: '/clients' },
  { name: 'Requests', path: '/requests' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Settings', path: '/settings' }
]
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Mobile Sidebar -->
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 z-50 flex md:hidden bg-black bg-opacity-50"
      @click.self="mobileMenuOpen = false"
    >
      <nav class="w-64 bg-white p-4 shadow-lg">
        <button @click="mobileMenuOpen = false" class="mb-4 text-sm text-gray-600">Close</button>
        <ul>
          <li v-for="item in navItems" :key="item.path">
            <RouterLink
              :to="item.path"
              class="block px-3 py-2 rounded hover:bg-gray-100 text-gray-800"
              @click="mobileMenuOpen = false"
            >
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Desktop Sidebar -->
    <aside class="hidden md:flex md:w-64 md:flex-col bg-white border-r border-gray-200 p-4">
      <h2 class="text-xl font-semibold mb-6">ReputaRank</h2>
      <ul class="space-y-2">
        <li v-for="item in navItems" :key="item.path">
          <RouterLink
            :to="item.path"
            class="block px-3 py-2 rounded hover:bg-gray-100 text-gray-800"
          >
            {{ item.name }}
          </RouterLink>
        </li>
      </ul>
    </aside>

    <!-- Main content -->
    <div class="flex flex-col flex-1">
      <!-- Top Nav -->
      <header class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shadow-sm">
        <button
          class="md:hidden text-gray-600"
          @click="mobileMenuOpen = true"
        >
          ☰
        </button>
        <h1 class="text-lg font-semibold text-gray-800">ReputaRank</h1>
        <div class="w-8 h-8 rounded-full bg-gray-300"></div> <!-- Profile placeholder -->
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
        <RouterView />
      </main>
    </div>
  </div>
</template>
