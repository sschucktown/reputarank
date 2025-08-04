import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref<Request[]>([])

  async function fetchRequests() {
    const { data, error } = await supabase.from('requests').select('*').order('created_at', { ascending: false })
    if (error) {
      toast.error('Failed to fetch requests.')
    } else {
      requests.value = data
    }
  }

  async function createRequest(name: string, email: string, message: string) {
    const { error } = await supabase.from('requests').insert({ name, email, message, status: 'pending' })
    if (error) {
      toast.error('Error submitting request.')
    } else {
      toast.success('Request submitted!')
      await fetchRequests()
    }
  }

  async function updateStatus(id: string, status: 'pending' | 'in progress' | 'completed') {
    const { error } = await supabase.from('requests').update({ status }).eq('id', id)
    if (error) {
      toast.error('Failed to update status.')
    } else {
      toast.success('Status updated.')
    }
  }

  return { requests, fetchRequests, createRequest, updateStatus }
})
