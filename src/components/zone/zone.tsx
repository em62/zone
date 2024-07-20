'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

const initialCount = 60 * 50

export default function ZonePage({ handleNextScene }: { handleNextScene: () => void }) {
  const [count, setCount] = useState(initialCount)
  const [run, setRun] = useState(false)

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

    if (count == 0) {
      handleNextScene()
    }
  }, [count, run])

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="absolute top-0 mt-10 text-sm text-muted-foreground">ZONEに入りましょう</div>
        <div className="text-4xl font-semibold">
          {Math.floor(count / 60)
            .toString()
            .padStart(2, '0')}
          :{(count % 60).toString().padStart(2, '0')}
        </div>
        <div className="absolute bottom-0 mb-10 flex gap-x-4 text-sm text-gray-500">
          {!run && <Button onClick={handleStart}>start</Button>}
          {!run && count < initialCount && <Button onClick={handleReset}>reset</Button>}
          {run && <Button onClick={handleStop}>stop</Button>}
        </div>
      </div>
    </>
  )
}
