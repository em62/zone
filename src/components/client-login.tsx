'use client'

import { login, logout } from '@/lib/features/login/loginSlice'
import { useAppDispatch } from '@/lib/hooks'
import { User } from '@supabase/supabase-js'
import { useEffect } from 'react'

export default function ClientLogin({ user }: { user: User | null }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      dispatch(login(user))
    } else {
      dispatch(logout())
    }
  }, [])

  return <></>
}
