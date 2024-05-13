'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Breathe from '@/app/zone/prepair-first'
import PrepairSecond from './prepair-second'
import ZonePage from './zone'
import BreakPage from './break'
import { useEffect } from 'react'
import { update } from '@/lib/features/currentPage/currentPageSlice'

export default function Zone() {
  const currentPage = useAppSelector((state: any) => state.currentPage)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(update('prepair1'))
  }, [])

  return (
    <>
      {currentPage == 'prepair1' && <Breathe />}
      {currentPage == 'prepair2' && <PrepairSecond />}
      {currentPage == 'zone' && <ZonePage />}
      {currentPage == 'break' && <BreakPage />}
    </>
  )
}
