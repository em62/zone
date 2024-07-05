'use client'

import { User } from '@supabase/supabase-js'

import { DataProvider, useDataContext } from '@/components/context'
import BreakPage from '@/components/zone/break'
import Breathe from '@/components/zone/deepbreath'
import End from '@/components/zone/end'
import PrepairSecond from '@/components/zone/prepair-second'
import ZonePage from '@/components/zone/zone'

export const CurrentPhase = ({ user }: { user: User | null }) => {
  return (
    <>
      <DataProvider>
        <Page user={user} />
      </DataProvider>
    </>
  )
}

function Page({ user }: { user: User | null }) {
  const { phase } = useDataContext()

  return (
    <>
      {phase == 'prepair1' && <Breathe />}
      {phase == 'prepair2' && <PrepairSecond />}
      {phase == 'zone' && <ZonePage />}
      {phase == 'break' && <BreakPage />}
      {phase == 'end' && <End user={user} />}
    </>
  )
}
