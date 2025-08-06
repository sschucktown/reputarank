import { defineStore } from 'pinia'
import { inject } from 'vue'
import type { SupabaseClient } from '@supabase/supabase-js'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useRequestsStore = defineStore('requests', () => {
  const isSending = ref(false)
  const sendSuccess = ref(false)

  function getSupabase(): SupabaseClient {
    const supabase = inject<SupabaseClient>('supabase')
    if (!supabase) throw new Error('Supabase client not provided')
    return supabase
  }

  async function sendRequest(name: string, email: string) {
    isSending.value = true
    sendSuccess.value = false

    try {
      const supabase = getSupabase()

      const { data, error } = await supabase.functions.invoke('send-request-email', {
        body: { name, email },
        headers: {
          'x-secret-key': import.meta.env.VITE_SECRET_KEY // Optional: only if secret key is still required
        }
      })

      if (error) {
        toast.error('Failed to send request.')
        console.error(error)
        return
      }

      toast.success('Request sent!')
      sendSuccess.value = true
    } catch (err) {
      console.error('Unexpected error:', err)
      toast.error('Something went wrong.')
    } finally {
      isSending.value = false
    }
  }

  return {
    isSending,
    sendSuccess,
    sendRequest,
  }
})
