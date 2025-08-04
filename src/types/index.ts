// src/types/index.ts

export interface Request {
  id: string
  name: string
  email: string
  message: string
  status: 'pending' | 'in progress' | 'completed'
  created_at?: string
}
