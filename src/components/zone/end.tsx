'use client'

import { Button } from '@/components/ui/button'
import { insertRecord } from '@/utils/supabase/actions'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function End({ user }: { user: User | null }) {
  const [value, setValue] = useState('')
  const [disabled, setDisabled] = useState(true)

  const handleSubmit = () => {
    setDisabled(true)
    insertRecord(value)
  }

  useEffect(() => {
    if (value.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [value])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-6 text-2xl font-bold">Well done!!</div>
      {user ? (
        <div className="flex flex-col space-y-4">
          <textarea value={value} placeholder="テキストを入力してください..." className="text-md p-4" onChange={(e) => setValue(e.target.value)} />
          <Button type="button" disabled={disabled} variant="default" onClick={handleSubmit}>
            レコードに追加してホームに戻る
          </Button>
          <Button asChild>
            <Link href="/">ホームに戻る</Link>
          </Button>
        </div>
      ) : (
        <Button asChild>
          <Link href="/">ホームに戻る</Link>
        </Button>
      )}
    </div>
  )
}
