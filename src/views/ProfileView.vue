<template>
  <MainLayout>
    <div class="max-w-xl mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">Profile Settings</h2>

      <form @submit.prevent="saveProfile" class="space-y-4 bg-white p-6 shadow rounded-lg">
        <div>
          <label class="block text-sm font-medium mb-1">Full Name</label>
          <input v-model="fullName" type="text" class="input" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Logo URL</label>
          <input v-model="logoUrl" type="text" class="input" />
        </div>

        <div v-if="logoUrl" class="flex justify-center">
          <img :src="logoUrl" alt="Logo Preview" class="h-24 object-contain" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Google Review Link</label>
          <input v-model="googleReviewLink" type="text" class="input" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Zillow Review Link</label>
          <input v-model="zillowReviewLink" type="text" class="input" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Plan Tier</label>
          <select v-model="planTier" class="input">
            <option value="Free">Free</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        <div class="text-right">
          <button type="submit" class="btn">Save Profile</button>
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import MainLayout from '@/layouts/MainLayout.vue'

const router = useRouter()

const fullName = ref('')
const logoUrl = ref('')
const googleReviewLink = ref('')
const zillowReviewLink = ref('')
const planTier = ref('Free')

const saveProfile = async () => {
  const { data: user } = await supabase.auth.getUser()
  if (!user?.user?.id) {
    alert('User not logged in')
    return
  }

  const { error } = await supabase.from('profiles').upsert({
    user_id: user.user.id,
    full_name: fullName.value,
    logo_url: logoUrl.value,
    google_review_link: googleReviewLink.value,
    zillow_review_link: zillowReviewLink.value,
    plan_tier: planTier.value,
  })

  if (error) {
    console.error('Error saving profile:', error)
    alert('Failed to save profile.')
  } else {
    alert('Profile saved!')
  }
}

onMounted(async () => {
  const { data: user } = await supabase.auth.getUser()
  if (!user?.user?.id) return

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.user.id)
    .single()

  if (data) {
    fullName.value = data.full_name || ''
    logoUrl.value = data.logo_url || ''
    googleReviewLink.value = data.google_review_link || ''
    zillowReviewLink.value = data.zillow_review_link || ''
    planTier.value = data.plan_tier || 'Free'
  }
})
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
.btn {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold;
}
</style>
