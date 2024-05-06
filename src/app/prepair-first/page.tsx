'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const status = ['息を吸ってー', '止めて', '息を吐いてー', '止めて']

export default function PrepairFirstPage() {
  const [count, setCount] = useState(1)
  const [round, setRound] = useState(0)

  const router = useRouter()

  useEffect(() => {
    if (round < 40) {
      const intervalId = setInterval(() => {
        setCount(count + 1)
        if (count % 4 === 0) {
          setCount(1)
          setRound(round + 1)
        }
      }, 1000)

      return () => clearInterval(intervalId)
    } else {
      router.push('/prepair-second')
    }
  }, [count, round, router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-0 mt-10 text-sm text-gray-500">画面の表示に合わせて深呼吸をします。</div>
      <div>{status[round % 4]}</div>
      <div className="absolute bottom-5 left-5 text-sm text-gray-500">{count}</div>
      <div className="absolute bottom-5 right-5 text-sm text-gray-500">{Math.floor(round / 4)} / 10</div>
    </div>
  )
}
