// supabase/functions/send-request-email/index.ts

import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.3'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const TO_EMAIL = Deno.env.get('TO_EMAIL') || 'your@email.com'

serve(async (req) => {
  // Debug: show the Authorization header
  const authHeader = req.headers.get('Authorization')
  console.log('Auth header:', authHeader)

  // Create Supabase client with forwarded auth header
  const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    global: {
      headers: {
        Authorization: authHeader ?? '',
      },
    },
  })

  // Check user auth (remove if not needed)
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    console.error('Auth error:', authError)
    return new Response('Unauthorized', { status: 401 })
  }

  // Read JSON from the request
  const { name, email, message } = await req.json()
  console.log('Received request:', { name, email, message })

  // Validate required fields
  if (!name || !email || !message) {
    return new Response('Missing fields', { status: 400 })
  }

  // Send email using Resend API
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'noreply@yourdomain.com',
      to: TO_EMAIL,
      subject: `New Request from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    }),
  })

  if (!emailRes.ok) {
    const errorText = await emailRes.text()
    console.error('Email failed:', errorText)
    return new Response('Email failed', { status: 500 })
  }

  console.log('Email sent successfully.')
  return new Response('Email sent successfully', { status: 200 })
})
