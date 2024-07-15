'use client'

import { getUser } from '@/db/actions'
import { useEffect } from 'react'
import { useDataContext } from './context'

export function DetectionUser({ children }: { children: React.ReactNode }) {
  const { setUser } = useDataContext()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      setUser(user)
    }

    fetchUser()
  }, [])

  return <>{children}</>
}

async function fetchUser() {
  return await getUser()
}
