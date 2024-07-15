'use client'

import { useEffect } from 'react'
import { DataProvider } from './context'
import { getUser } from '@/db/actions'

export function Provider({ children }: { children: React.ReactNode }) {
  return <DataProvider>{children}</DataProvider>
}
