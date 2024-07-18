'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/db/server'

export const signIn = async () => {
  const db = createClient()
  const origin = headers().get('origin')

  const { data, error } = await db.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error)
  } else {
    return redirect(data.url)
  }
}
