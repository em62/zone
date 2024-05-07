'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PrepairSecondPage() {
  const [count, setCount] = useState(60)
  const router = useRouter()

  useEffect(() => {
    if (count > 0) {
      const intervalId = setInterval(() => {
        setCount(count - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    } else {
      router.push('/focus')
    }
  }, [count, router])

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
