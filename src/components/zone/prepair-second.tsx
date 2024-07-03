'use client'

import { update } from '@/lib/features/currentPage/currentPageSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useEffect, useState } from 'react'

export default function PrepairSecond() {
  const [count, setCount] = useState(60)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (count > 0) {
      const intervalId = setInterval(() => {
        setCount(count - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    } else {
      dispatch(update('zone'))
    }
  }, [count, dispatch])

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="absolute top-0 mt-10 text-sm text-muted-foreground">木を見つめましょう</div>
        <div className="text-6xl">🌲</div>
        <div className="absolute bottom-5 right-5 text-sm text-muted-foreground">{count}</div>
      </div>
    </>
  )
}
