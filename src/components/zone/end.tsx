'use client'

import { Button } from '@/components/ui/button'
import { insertRecord } from '@/utils/supabase/actions'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useState } from 'react'

export default function End({ user }: { user: User | null }) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    insertRecord(value)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-6 text-2xl font-bold">Well done!!</div>
      {user ? (
        <form action={handleSubmit}>
          <textarea value={value} onChange={(e) => setValue(e.target.value)} />
          <button type="submit">submit</button>
        </form>
      ) : (
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      )}
    </div>
  )
}
