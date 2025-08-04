// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ClientsView from '@/views/ClientsView.vue'
import RequestsView from "@/views/RequestsView.vue";
import ReviewsView from '@/views/ReviewsView.vue'
import SettingsView from '@/views/SettingsView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard' as const,
  },
  {
    path: '/login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    component: SignupView,
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/clients',
    component: ClientsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/requests',
    component: RequestsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/reviews',
    component: ReviewsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    component: SettingsView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
