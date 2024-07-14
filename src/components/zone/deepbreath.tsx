'use client'

import { Badge } from '@/components/ui/badge'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useDataContext } from '../context'

const arr = ['in', 'out']

export default function Deepbreath() {
  const [count, setCount] = useState(0)
  const [round, setRound] = useState(0)
  const [status, setStatus] = useState('in')
  const [started, setStarted] = useState(false)
  const { setPhase } = useDataContext()
  const audioRef = useRef<null | any>(null)

  const handleClick = () => {
    setStarted(true)
  }

  useEffect(() => {
    if (!started) return
    if (round <= 1) {
      const intervalId = setInterval(() => {
        setCount(count + 1)
        if (count % 4 == 0) {
          setStatus(arr[round % 2])
          setRound(round + 1)
          audioRef.current.play()
        }
      }, 1000)

      return () => clearInterval(intervalId)
    } else {
      setPhase('prepair2')
    }
  }, [count, round, started])

  return (
    <>
      {started ? (
        <div>
          {status && <Badge>{status == 'in' ? '吸って' : status == 'out' ? '吐いて' : ''}</Badge>}
          <div className="absolute bottom-5 left-5 text-sm text-muted-foreground">{count}</div>
          <div className="absolute bottom-5 right-5 text-sm text-muted-foreground">{Math.ceil(count / 8)} / 10</div>
          <div>
            <audio ref={audioRef}>
              <source src="sound1.mp3" type="audio/mp3" />
            </audio>
          </div>
        </div>
      ) : (
        <>
          <button onClick={handleClick}>submit</button>
        </>
      )}
    </>
  )
}
