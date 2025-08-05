// src/types/index.ts
export type RequestStatus = 'pending' | 'in_review' | 'completed'

// src/types/index.ts
export interface UserRequest {
  id: string
  name: string
  email: string
  message: string
  status: 'pending' | 'in_review' | 'completed'
  admin_note?: string
  client_id?: string
  created_at?: string
}

export interface Client {
  id: string
  name: string
  email: string
  created_at?: string
}


