'use client'

import { login, logout } from '@/lib/features/login/loginSlice'
import { useAppDispatch } from '@/lib/hooks'
import { User } from '@supabase/supabase-js'
import { useEffect } from 'react'

export const ClientLoginDispatch = ({ user, children }: { user: User | null; children: React.ReactNode }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      dispatch(login(user))
    } else {
      dispatch(logout())
    }
  }, [dispatch, user])

  return <>{children}</>
}
