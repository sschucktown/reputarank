// src/stores/clients.ts
import { defineStore } from 'pinia'
import { ref, inject } from 'vue'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Client } from '@/types'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useClientsStore = defineStore('clients', () => {
  const clients = ref<Client[]>([])

  function getSupabase() {
    const supabase = inject<SupabaseClient>('supabase')
    if (!supabase) throw new Error('Supabase client not provided')
    return supabase
  }

  async function fetchClients() {
    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch clients')
    } else {
      clients.value = data as Client[]
    }
  }

  async function addClient(name: string, email: string) {
    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('clients')
      .insert({ name, email })
      .select()
      .single()

    if (error) {
      toast.error('Error adding client')
    } else {
      toast.success('Client added')
      if (data) clients.value.unshift(data as Client)
    }
  }

  return { clients, fetchClients, addClient }
})
