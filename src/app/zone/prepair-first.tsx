'use client'

import { Badge } from '@/components/ui/badge'
import { update } from '@/lib/features/currentPage/currentPageSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useEffect, useState } from 'react'

const arr = ['in', 'hold-in', 'out', 'hold-out']

export default function PrepairFirst() {
  const [count, setCount] = useState(0)
  const [round, setRound] = useState(0)
  const [status, setStatus] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (round <= 40) {
      const intervalId = setInterval(() => {
        setCount(count + 1)
        if (count % 4 == 0) {
          setStatus(arr[round % 4])
          setRound(round + 1)
        }
      }, 1000)

      return () => clearInterval(intervalId)
    } else {
      dispatch(update('prepair2'))
    }
  }, [count, round])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-0 mt-10 text-sm text-muted-foreground">画面の表示に合わせて深呼吸をします。</div>
      <div className="flex items-center justify-center">
        <div className="relative h-60 w-60 rounded-full border border-border">
          <div className="absolute left-1/2 top-1/2 origin-center translate-x-[-50%] translate-y-[-50%] text-muted-foreground">
            {status && <Badge>{status == 'in' ? '吸って' : status == 'hold-in' ? '止めて' : status == 'out' ? '吐いて' : status == 'hold-out' ? '止めて' : ''}</Badge>}
          </div>
          <div
            className={`absolute left-1/2 top-1/2 origin-center translate-x-[-50%] translate-y-[-50%] ${status == 'in' ? 'h-60 w-60 opacity-100' : status == 'hold-in' ? 'h-60 w-60 opacity-100' : status == 'out' ? 'h-0 w-0 opacity-0' : status == 'hold-out' ? 'h-0 w-0 opacity-0' : 'h-0 w-0 opacity-0'} duration-4000 rounded-full border border-primary transition-all dark:border-white`}
          ></div>
        </div>
      </div>
      <div className="absolute bottom-5 left-5 text-sm text-muted-foreground">{count}</div>
      <div className="absolute bottom-5 right-5 text-sm text-muted-foreground">{Math.ceil(count / 16)} / 10</div>
    </div>
  )
}
