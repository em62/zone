import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/db/server'

export async function POST(req: NextRequest) {
  const db = createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await db.auth.getUser()

  if (user) {
    await db.auth.signOut()
  }

  revalidatePath('/', 'layout')
  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  })
}
