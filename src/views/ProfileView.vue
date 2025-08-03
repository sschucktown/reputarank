<!-- src/views/ProfileView.vue -->
<template>
  <MainLayout>
    <div class="max-w-2xl mx-auto space-y-6">
      <h2 class="text-2xl font-bold">Profile Settings</h2>

      <form @submit.prevent="saveProfile" class="space-y-4">
        <div>
          <label class="block font-semibold mb-1">Full Name</label>
          <input v-model="fullName" class="input" type="text" required />
        </div>

        <div>
          <label class="block font-semibold mb-1">Logo URL</label>
          <input v-model="logoUrl" class="input" type="url" />
        </div>

        <div>
          <label class="block font-semibold mb-1">Google Review Link</label>
          <input v-model="googleLink" class="input" type="url" />
        </div>

        <div>
          <label class="block font-semibold mb-1">Zillow Review Link</label>
          <input v-model="zillowLink" class="input" type="url" />
        </div>

        <div>
          <label class="block font-semibold mb-1">Plan Tier</label>
          <select v-model="planTier" class="input">
            <option value="">Select a plan</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <button type="submit" class="btn">Save Profile</button>
      </form>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import MainLayout from '@/layouts/MainLayout.vue'

const fullName = ref('')
const logoUrl = ref('')
const googleLink = ref('')
const zillowLink = ref('')
const planTier = ref('')

onMounted(async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

  if (data) {
    fullName.value = data.full_name || ''
    logoUrl.value = data.logo_url || ''
    googleLink.value = data.google_review_link || ''
    zillowLink.value = data.zillow_review_link || ''
    planTier.value = data.plan_tier || ''
  } else if (error && error.code !== 'PGRST116') {
    console.error('Error loading profile:', error)
  }
})

async function saveProfile() {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase.from('profiles').upsert({
    user_id: user.id,
    full_name: fullName.value,
    logo_url: logoUrl.value,
    google_review_link: googleLink.value,
    zillow_review_link: zillowLink.value,
    plan_tier: planTier.value
  })

  if (error) {
    console.error('Error saving profile:', error)
  } else {
    console.log('Profile saved!')
  }
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded px-3 py-2 w-full;
}
.btn {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded;
}
</style>
