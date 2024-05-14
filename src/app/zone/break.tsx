'use client'

import { update } from '@/lib/features/currentPage/currentPageSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useEffect, useState } from 'react'
//10 * 60
const initialCount = 5

export default function BreakPage() {
  const [count, setCount] = useState(initialCount)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (count > 0) {
      const intervalId = setInterval(() => {
        setCount(count - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    } else {
      dispatch(update('end'))
    }
  }, [count])

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="absolute top-0 mt-10 text-sm text-gray-500">リラックスしましょう。</div>
        <div className="text-4xl font-semibold">
          {Math.floor(count / 60)
            .toString()
            .padStart(2, '0')}
          :{(count % 60).toString().padStart(2, '0')}
        </div>
      </div>
    </>
  )
}
