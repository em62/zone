'use client'

import { User } from '@supabase/supabase-js'
import { Badge } from '../ui/badge'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { isSameDay, parseISO } from 'date-fns'

export const RecordStatus = ({ user }: { user: User }) => {
  const [records, setRecords] = useState(0)
  const [todayTimes, setTodayTimes] = useState(0)

  const db = createClient()
  const getData = useCallback(async () => {
    const { data } = await db.from('record').select().eq('user_id', user?.id)
    const filteredData = data?.filter((d) => isSameDay(parseISO(d.created_at), new Date()))
    setRecords(data!.length)
    setTodayTimes(filteredData!.length)
  }, [db, user?.id])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className="mt-6 flex gap-x-4">
      <Badge variant="secondary">Total {records} Times</Badge>
      <Badge variant="secondary">Today {todayTimes} Times</Badge>
    </div>
  )
}
