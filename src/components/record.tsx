'use client'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { cache, useEffect, useState } from 'react'

export default function Record({ user }: { user: User }) {
  const [items, setItems] = useState<any>([])

  const supabase = createClient()

  const getData = cache(async () => {
    const { data } = await supabase.from('record').select().eq('user_id', user?.id)
    setItems(data)
  })

  useEffect(() => {
    getData()
  }, [user, getData])

  return (
    <>
      {items?.length > 0 ? (
        <ul>
          {items?.map((item: any) => (
            <li key={item.id}>
              <p>{item.created_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>記録がありません。</p>
      )}
    </>
  )
}
