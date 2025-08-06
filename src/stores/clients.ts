import { defineStore } from 'pinia'
import { supabase } from '@/plugins/supabase'
import { ref } from 'vue'
import type { Client } from '@/types'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useClientsStore = defineStore('clients', () => {
  const clients = ref<Client[]>([])

  async function fetchClients() {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      toast.error('You must be logged in to fetch clients.')
      return
    }

    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id) // Only fetch the user's clients
        .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch clients.')
      console.error('Fetch error:', error)
    } else {
      clients.value = data as Client[]
    }
  }

  async function addClient(name: string, email: string) {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      toast.error('You must be logged in to add a client.')
      return
    }

    console.log('Inserting client with user_id:', user.id)

    await supabase.from('clients').insert([
      {
        name,
        email,
        user_id: user.id
      }
    ])

    // if (error) {
    //   console.error('Insert error:', error)
    //   toast.error('Failed to add client.')
    // } else {
    //   toast.success('Client added!')
    //   if (data && data[0]) {
    //     clients.value.unshift(data[0] as Client)
    //   }
    // }
  }

  return {
    clients,
    fetchClients,
    addClient
  }
})
