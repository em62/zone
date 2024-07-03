'use server'

import { cache } from 'react'
import { createClient } from './server'
import { format } from 'date-fns'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
