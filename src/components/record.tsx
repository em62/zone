'use client'

import { User } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Badge } from '@/components/ui/badge'
import { compareDesc, format, isSameDay, parseISO } from 'date-fns'
import Link from 'next/link'

type Record = {
  created_at: string
  id: string
  user_id: string
}

export default function Record({ user }: { user: User }) {
  const [records, setRecords] = useState<Record[] | null>([])
  const [todayTimes, setTodayTimes] = useState(0)

  const supabase = createClient()

  const getData = useCallback(async () => {
    const { data } = await supabase.from('record').select().eq('user_id', user?.id)
    const sortedData = data?.sort((a, b) => compareDesc(parseISO(a.created_at), parseISO(b.created_at)))
    const filteredData = data?.filter((d) => isSameDay(parseISO(d.created_at), new Date()))
    setTodayTimes(filteredData!.length)
    setRecords(sortedData!)
  }, [supabase, user?.id])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <div className="mt-6 flex gap-x-4">
        <Badge variant="secondary">Total {records!.length} Times</Badge>
        <Badge variant="secondary">Today {todayTimes} Times</Badge>
      </div>
      <div className="mt-6">
        {records ? (
          <ul className="flex flex-col divide-y divide-[#e4e4e7] border-t border-[#e4e4e7] dark:divide-[#27272a] dark:border-[#27272a]">
            {records?.map((record: Record) => (
              <li key={record.id} className="flex justify-between px-4 py-4">
                <div className="text-sm text-muted-foreground">{format(record.created_at, 'yyyy-MM-dd HH:mm')}</div>
                <Link href={`/record/${record.id}`} className="text-sm text-muted-foreground">
                  more
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#a1a1aa]">まだ記録がありません...</p>
        )}
      </div>
    </>
  )
}
