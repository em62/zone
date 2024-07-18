'use client'

import { useEffect, useState } from 'react'

export default function PrepairSecond({ handleNextScene }: { handleNextScene: () => void }) {
  const [count, setCount] = useState(60)

  useEffect(() => {
    if (count > 0) {
      const intervalId = setInterval(() => {
        setCount(count - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    } else {
      handleNextScene()
    }
  }, [count])

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#adfa1d] opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-[#adfa1d]"></span>
          </span>
        </div>
        <div className="absolute bottom-5 right-5 text-sm text-muted-foreground">{count}</div>
      </div>
    </>
  )
}
