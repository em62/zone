'use client'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { Button } from './button'
import Link from 'next/link'

export default function Temp({ user }: { user: User }) {
  const supabase = createClient()

  const uploadData = async (data: any) => {
    await supabase.from('record').insert(data)
  }

  const handleClick = () => {
    uploadData({
      user_id: user?.id,
      created_at: new Date().toISOString(),
    })
  }

  return (
    <Button onClick={handleClick}>
      <Link href="/">back to top</Link>
    </Button>
  )
}
