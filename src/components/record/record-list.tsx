'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { compareDesc, parseISO } from 'date-fns'
import { User } from '@supabase/supabase-js'
import { RecordItem } from './record-item'

export const RecordList = ({ user }: { user: User }) => {
  const [list, setList] = useState<any>([])
  const db = createClient()
  const getData = useCallback(async () => {
    const { data } = await db.from('record').select().eq('user_id', user?.id)
    const sortedData = data?.sort((a, b) => compareDesc(parseISO(a.created_at), parseISO(b.created_at)))
    setList(sortedData!)
  }, [db, user?.id])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className="mt-6">
      {list ? (
        <ul className="flex flex-col divide-y divide-[#e4e4e7] border-t border-[#e4e4e7] dark:divide-[#27272a] dark:border-[#27272a]">
          {list.map((item: any) => (
            <RecordItem key={item.id} record={item} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[#a1a1aa]">まだ記録がありません...</p>
      )}
    </div>
  )
}
