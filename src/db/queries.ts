'use server'

import { cache } from 'react'
import { revalidatePath } from 'next/cache'

import { PostgrestError, User } from '@supabase/supabase-js'

import { Record } from '@/type/record'
import { createClient } from './server'

export const getUser: () => Promise<User | null> = cache(async () => {
  const db = createClient()
  const {
    data: { user },
  } = await db.auth.getUser()

  return user
})

export const getRecords: (id: string) => Promise<Record[] | null> = cache(async (id) => {
  const db = createClient()
  const { data } = await db.from('records').select().eq('user_id', id).order('created_at', { ascending: false })

  return data
})

export const setRecords: (text: string) => Promise<PostgrestError | null> = async (text) => {
  const db = createClient()
  const { error } = await db.from('records').insert({
    text: text,
  })

  revalidatePath('/record', 'page')

  return error
}
