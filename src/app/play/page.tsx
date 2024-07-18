'use client'

import BreakPage from '@/components/zone/break'
import End from '@/components/zone/end'
import PrepairSecond from '@/components/zone/prepair-second'
import Breathe from '@/components/zone/deepbreath'

import ZonePage from '@/components/zone/zone'
import { getUser } from '@/db/queries'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

// const scenes = ['prepair1', 'prepair2', 'zone', 'break', 'end']

export default function PlayPage() {
  const [index, setIndex] = useState(0)
  const [user, setUser] = useState<User | null>(null)

  const handleIncrement = () => {
    setIndex(index + 1)
  }

  useEffect(() => {
    const initialize = async () => {
      const user = await getUser()
      setUser(user)
    }

    initialize()
  }, [])

  switch (index) {
    case 0:
      return <Breathe handleNextScene={handleIncrement} />
    case 1:
      return <PrepairSecond handleNextScene={handleIncrement} />
    default:
      return <End user={user} />
  }

  return (
    <>
      {index == 0 ? (
        <Breathe handleNextScene={handleIncrement} />
      ) : index == 1 ? (
        <PrepairSecond handleNextScene={handleIncrement} />
      ) : (
        // ) : current == pages[2] ? (
        //   <ZonePage setCurrent={setCurrent} />
        // ) : current == pages[3] ? (
        //   <BreakPage setCurrent={setCurrent} />
        // ) : (
        <End user={user} />
      )}
    </>
  )
}
