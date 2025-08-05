// src/stores/requests.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useToast } from 'vue-toastification'
import type { UserRequest } from '@/types'

const toast = useToast()

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref<UserRequest[]>([])

  async function fetchRequests() {
    const { data, error } = await supabase
        .from('requests')
        .select('id, name, email, message, status, created_at, clients (id, name, email)')
        .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch requests')
    } else {
      requests.value = data as any
    }
  }

  async function createRequest(name: string, email: string, message: string) {
    const { error: insertError } = await supabase
        .from('requests')
        .insert({ name, email, message, status: 'pending' })

    if (insertError) {
      toast.error('Failed to submit request')
      return
    }

    // ✅ Call the Edge Function with Authorization
    try {
      const response = await fetch('https://udkxcqqwppncfghmodkb.functions.supabase.co/send-request-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVka3hjcXF3cHBuY2ZnaG1vZGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMDkzOTcsImV4cCI6MjA2OTU4NTM5N30.mr6twOgbkKJtjfb3Y9ZpzBs4Y-ESk4R_aH2FBEVlXAE`,
        },
        body: JSON.stringify({ name, email, message })
      })

      if (response.ok) {
        toast.success('Request submitted and email sent')
      } else {
        const errorText = await response.text()
        console.error('Email function failed:', errorText)
        toast.warning('Request submitted, but email failed')
      }
    } catch (err) {
      console.error('Network or server error:', err)
      toast.warning('Request submitted, but email failed due to network/server issue')
    }

    await fetchRequests()
  }

  async function updateStatus(id: string, status: UserRequest['status']) {
    const { error } = await supabase
        .from('requests')
        .update({ status })
        .eq('id', id)

    if (error) {
      toast.error('Failed to update status.')
    } else {
      toast.success('Status updated.')
    }
  }

  async function updateAdminNote(id: string, admin_note: string) {
    const { error } = await supabase
        .from('requests')
        .update({ admin_note })
        .eq('id', id)

    if (error) {
      toast.error('Failed to save note.')
    } else {
      toast.success('Note saved.')
      await fetchRequests()
    }
  }

  return {
    requests,
    fetchRequests,
    createRequest,
    updateStatus,
    updateAdminNote
  }
})
