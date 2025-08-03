import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        loading: true
    }),
    getters: {
        isLoggedIn: (state) => !!state.user
    },
    actions: {
        async fetchUser() {
            const {
                data: { user }
            } = await supabase.auth.getUser()
            this.user = user
            this.loading = false
        },
        async signOut() {
            await supabase.auth.signOut()
            this.user = null
        }
    }
})
