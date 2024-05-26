'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Breathe from '@/components/zone/prepair-first'
import PrepairSecond from '@/components/zone/prepair-second'
import ZonePage from '@/components/zone/zone'
import BreakPage from '@/components/zone/break'
import End from '@/components/zone/end'
import { User } from '@supabase/supabase-js'
import { update } from '@/lib/features/currentPage/currentPageSlice'

export const CurrentPhase = ({ user }: { user: User | null }) => {
  const currentPage = useAppSelector((state: any) => state.currentPage)
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(update('prepair1'))
    }
  }, [dispatch])

  return (
    <>
      {currentPage == 'prepair1' && <Breathe />}
      {currentPage == 'prepair2' && <PrepairSecond />}
      {currentPage == 'zone' && <ZonePage />}
      {currentPage == 'break' && <BreakPage />}
      {currentPage == 'end' && <End user={user} />}
    </>
  )
}
