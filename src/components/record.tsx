'use client'

import { User } from '@supabase/supabase-js'
import { cache, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Badge } from '@/components/ui/badge'

export default function Record({ user }: { user: User }) {
  const [items, setItems] = useState<any>([])
  const [todayTimes, setTodayTimes] = useState(0)

  const supabase = createClient()

  const getData = cache(async () => {
    const { data } = await supabase.from('record').select().eq('user_id', user?.id)
    data?.sort((a, b) => b.id - a.id)
    const filter = data?.filter((d) => formattedDate(d.created_at) == formattedDate(new Date()))
    setTodayTimes(filter!.length)
    setItems(data)
  })

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="mt-6 flex gap-x-4">
        <Badge variant="secondary">Total {items.length} Times</Badge>
        <Badge variant="secondary">Today {todayTimes} Times</Badge>
      </div>
      <div className="mt-6 border border-[#2F2F2F]"></div>
      <div className="mt-6">
        {items?.length > 0 ? (
          <ul className="flex flex-col divide-y divide-[#2F2F2F] rounded border border-[#2F2F2F]">
            {items?.map((item: any) => {
              const timestamp = item.created_at
              const date = new Date(timestamp)
              const hours = String(date.getHours()).padStart(2, '0')
              const minutes = String(date.getMinutes()).padStart(2, '0')
              const d = formattedDate(date)
              const formattedTime = hours + ':' + minutes

              return (
                <li key={item.id} className="flex justify-between px-4 py-4">
                  {d == formattedDate(new Date()) ? (
                    <>
                      <div className="text-sm text-white">{d}</div>
                      <p className="text-sm text-white">{formattedTime}</p>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-gray-400">{d}</div>
                      <p className="text-sm text-gray-400">{formattedTime}</p>
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-sm text-[#a1a1aa]">まだ記録がありません...</p>
        )}
      </div>
    </>
  )
}

function formattedDate(data: Date | string) {
  const date = new Date(data)
  const formatedDate = date.getFullYear() + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0')
  return formatedDate
}
