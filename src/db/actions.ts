'use server'

import { cache } from 'react'
import { revalidatePath } from 'next/cache'
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

export const getUser = cache(async () => {
  const db = createClient()
  const {
    data: { user },
  } = await db.auth.getUser()
  return user
})

export const getRecord = cache(async (id: string) => {
  const db = createClient()
  const { data } = await db.from('record').select().eq('user_id', id).order('created_at', { ascending: false })
  return data
})

export const insertRecord = async (text: string) => {
  const db = createClient()
  await db.from('record').insert({
    text: text,
  })

  revalidatePath('/record', 'page')
  redirect('/')
}
