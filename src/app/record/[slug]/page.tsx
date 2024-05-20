'use client'

import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

export default function Page({ params }: { params: { slug: string } }) {
  const [record, setRecord] = useState<any>()

  const supabase = createClient()
  const getData = useCallback(async () => {
    const { data } = await supabase.from('record').select().eq('id', params.slug)
    setRecord(data![0])
  }, [params.slug, supabase])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <Link href="/record">Back</Link>
      {record && (
        <>
          <div>id: {record.id}</div>
          <div>user_id: {record.user_id}</div>
          <div>created_at: {record.created_at}</div>
        </>
      )}
    </>
  )
}
