'use client'

import { Button } from '@/components/button'
import { useAppSelector } from '@/lib/hooks'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'
import Link from 'next/link'

export default function End() {
  const supabase = createClient()
  const user = useAppSelector((state: any) => state.login)

  const uploadData = async (data: any) => {
    await supabase.from('record').insert(data)
  }

  const handleClick = () => {
    console.log('clicked')
    uploadData({
      user_id: user?.id,
      created_at: formattedDate(new Date()),
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-2xl font-bold">Well done!!</div>
      {user ? (
        <Link href="/">
          <Button onClick={handleClick}>back to top</Button>
        </Link>
      ) : (
        <Button>
          <Link href="/">back to top</Link>
        </Button>
      )}
    </div>
  )
}

function formattedDate(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ssXXX")
}
