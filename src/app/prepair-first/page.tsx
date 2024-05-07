'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const arr = ['in', 'hold-in', 'out', 'hold-out']

export default function PrepairFirstPage() {
  const [count, setCount] = useState(0)
  const [round, setRound] = useState(0)
  const [set, setSet] = useState(0)
  const [status, setStatus] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (round <= 40) {
      const intervalId = setInterval(() => {
        setCount(count + 1)
        if (count % 4 == 0) {
          setStatus(arr[round % 4])
          setRound(round + 1)
          console.log(count)
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
      <div className="flex items-center justify-center">
        <div className="relative h-60 w-60 rounded-full border border-gray-500">
          <div
            className={`absolute left-1/2 top-1/2 origin-center translate-x-[-50%] translate-y-[-50%] ${status == 'in' ? 'h-60 w-60' : status == 'hold-in' ? 'h-60 w-60' : status == 'out' ? 'h-0 w-0' : status == 'hold-out' ? 'h-0 w-0' : 'h-0 w-0'} rounded-full border border-white transition-all duration-[4000ms]`}
          ></div>
        </div>
      </div>
      <div className="absolute bottom-5 left-5 text-sm text-gray-500">{count}</div>
      <div className="absolute bottom-5 right-5 text-sm text-gray-500">{Math.ceil(count / 16)} / 10</div>
    </div>
  )
}
