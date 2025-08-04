// src/stores/useRequestsStore.ts
import { defineStore } from 'pinia'

export const useRequestsStore = defineStore('requests', {
  state: () => ({
    requests: [] as {
      name: string
      email: string
      phone?: string
      service: string
    }[],
  }),
  actions: {
    addRequest(request: { name: string; email: string; phone?: string; service: string }) {
      this.requests.push(request)
    },
  },
})
