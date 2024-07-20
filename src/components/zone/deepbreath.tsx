'use client'

import { useEffect, useRef, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { SpeakerOffIcon } from '@radix-ui/react-icons'

const arr = ['in', 'out']

export default function Deepbreath({ handleNextScene }: { handleNextScene: () => void }) {
  const [count, setCount] = useState(80)
  const [round, setRound] = useState(1)
  const [status, setStatus] = useState('in')
  const [started, setStarted] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(audioRef.current.muted)
    }
  }

  useEffect(() => {
    if (!started) return

    if (round <= 10) {
      const intervalId = setInterval(() => {
        if (count % 4 === 1) {
          setStatus(arr[round % 2])
          setRound(round + 1)
          if (audioRef.current) {
            audioRef.current.play()
          }
        }
        setCount(count - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    } else {
      handleNextScene()
    }
  }, [count, started, round, handleNextScene])

  return started ? (
    <>
      <div>
        <Button onClick={handleMute}>
          <SpeakerOffIcon />
          {isMuted ? 'Unmute' : 'Mute'}
        </Button>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{status === 'in' ? 'breathe in' : 'breathe out'}</div>
        <div className="absolute bottom-5 right-5 text-sm text-muted-foreground">{count}</div>
        <div>
          <audio ref={audioRef}>
            <source src="sound1.mp3" type="audio/mp3" />
          </audio>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <div className="mb-4 text-sm text-muted-foreground">深呼吸をしましょう</div>
      </div>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
        <Button variant="secondary" size="sm" onClick={() => setStarted(true)}>
          開始
        </Button>
      </div>
    </>
  )
}
