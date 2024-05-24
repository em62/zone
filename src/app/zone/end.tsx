'use client'

import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/lib/hooks'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'
import Link from 'next/link'
import { useEffect } from 'react'

export default function End() {
  const supabase = createClient()
  const user = useAppSelector((state: any) => state.login)

  useEffect(() => {
    if (user) {
      const uploadData = async () => {
        await supabase.from('record').insert({
          user_id: user?.id,
          created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX"),
        })
      }
      uploadData()
    }
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-6 text-2xl font-bold">Well done!!</div>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
