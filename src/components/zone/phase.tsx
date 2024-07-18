'use client'

import { useEffect, useState } from 'react'

import BreakPage from '@/components/zone/break'
import Breathe from '@/components/zone/deepbreath'
import End from '@/components/zone/end'
import PrepairSecond from '@/components/zone/prepair-second'
import ZonePage from '@/components/zone/zone'
import { getUser } from '@/db/queries'
import { User } from '@supabase/supabase-js'

const pages = ['prepair1', 'prepair2', 'zone', 'break', 'end']

export const CurrentPhase = () => {
  const [current, setCurrent] = useState(pages[0])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const initialize = async () => {
      const user = await getUser()
      setUser(user)
    }

    initialize()
  }, [])

  return (
    <>
      {current == pages[0] ? (
        <Breathe setCurrent={setCurrent} />
      ) : current == pages[1] ? (
        <PrepairSecond setCurrent={setCurrent} />
      ) : current == pages[2] ? (
        <ZonePage setCurrent={setCurrent} />
      ) : current == pages[3] ? (
        <BreakPage setCurrent={setCurrent} />
      ) : (
        <End user={user} />
      )}
    </>
  )
}
