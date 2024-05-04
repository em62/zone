'use client'

import { Button } from '@/components/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const initialCount = 60 * 50

export default function FocusPage() {
  const [count, setCount] = useState(initialCount)
  const [run, setRun] = useState(false)

  const router = useRouter()

  const handleStart = () => {
    setRun(true)
  }

  const handleStop = () => {
    setRun(false)
  }

  const handleReset = () => {
    setCount(initialCount)
  }

  useEffect(() => {
    if (run && count > 0) {
      const intervalId = setInterval(() => {
        setCount(count - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    }

    if (count == 0) router.push('/break')
  }, [count, run, router])

  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="absolute top-0 mt-10 text-gray-500 text-sm">focus</div>
        <div className="font-semibold text-4xl">
          {Math.floor(count / 60)}:{(count % 60).toString().padStart(2, '0')}
        </div>
        {!run && (
          <div className="flex absolute bottom-0 mb-10 text-gray-500 text-sm">
            <div>
              <Button onClick={handleStart}>start</Button>
            </div>
            <div>
              <Button onClick={handleReset}>reset</Button>
            </div>
          </div>
        )}
        {run && (
          <div className="absolute bottom-0 mb-10 text-gray-500 text-sm">
            <Button onClick={handleStop}>stop</Button>
          </div>
        )}
      </div>
    </>
  )
}
