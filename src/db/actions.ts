'use server'

import { cache } from 'react'
import { revalidatePath, unstable_cache } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/db/server'
const db = createClient()

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

export const getUser = cache(async () => {
  const {
    data: { user },
  } = await db.auth.getUser()
  return user
})

export const getRecord = unstable_cache(
  async (id: string) => {
    const { data } = await db.from('records').select().eq('user_id', id).order('created_at', { ascending: false })
    return data
  },
  ['records-subs'],
  { revalidate: 3600 },
)

export const insertRecord = async (text: string) => {
  const db = createClient()
  const { error } = await db.from('records').insert({
    text: text,
  })

  revalidatePath('/record', 'page')

  return error
}
