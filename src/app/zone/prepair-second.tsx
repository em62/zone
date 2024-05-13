'use client'

import { update } from '@/lib/features/currentPage/currentPageSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useEffect, useState } from 'react'

export default function PrepairSecond() {
  const [count, setCount] = useState(5) // 60
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
  }, [count])

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="absolute top-0 mt-10 text-sm text-gray-500">本を見つめましょう</div>
        <div className="text-4xl">🌲</div>
        <div className="absolute bottom-5 right-5 text-sm text-gray-500">{count}</div>
      </div>
    </>
  )
}
