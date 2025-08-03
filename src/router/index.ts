import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

// Views
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ClientsView from '@/views/ClientsView.vue'
import ReviewsView from '@/views/ReviewsView.vue'
import EmailTemplatesView from '@/views/EmailTemplatesView.vue'
import SettingsView from '@/views/SettingsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import LoadingView from '@/views/LoadingView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: LoginView, meta: { guestOnly: true } },
  { path: '/signup', component: SignupView, meta: { guestOnly: true } },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/clients', component: ClientsView, meta: { requiresAuth: true } },
  { path: '/reviews', component: ReviewsView, meta: { requiresAuth: true } },
  { path: '/email-templates', component: EmailTemplatesView, meta: { requiresAuth: true } },
  { path: '/settings', component: SettingsView, meta: { requiresAuth: true } },
  { path: '/loading', component: LoadingView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
let firstLoad = true

router.beforeEach(async (to, from, next) => {
  if (firstLoad) {
    firstLoad = false
    next('/loading')
    return
  }

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (to.meta.requiresAuth && !user) {
    next('/login')
  } else if (to.meta.guestOnly && user) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
