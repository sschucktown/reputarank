import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://udkxcqqwppncfghmodkb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVka3hjcXF3cHBuY2ZnaG1vZGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMDkzOTcsImV4cCI6MjA2OTU4NTM5N30.mr6twOgbkKJtjfb3Y9ZpzBs4Y-ESk4R_aH2FBEVlXAE'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast)
app.provide('supabase', supabase)
app.mount('#app')
