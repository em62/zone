'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

export default function PrepairSecond({ handleNextScene }: { handleNextScene: () => void }) {
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(60)

  useEffect(() => {
    if (!started) return
    if (count > 0) {
      const intervalId = setInterval(() => {
        setCount(count - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    } else {
      handleNextScene()
    }
  }, [count, started])

  return started ? (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="relative flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#adfa1d] opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-[#adfa1d]"></span>
        </span>
      </div>
      <div className="fixed bottom-5 right-5 text-sm text-muted-foreground">{count}</div>
    </div>
  ) : (
    <>
      <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <div className="mb-4 text-sm text-muted-foreground">中央の点を見つめましょう</div>
      </div>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
        <Button variant="secondary" size="sm" onClick={() => setStarted(true)}>
          開始
        </Button>
      </div>
    </>
  )
}
