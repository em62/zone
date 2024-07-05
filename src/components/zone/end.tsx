'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { User } from '@supabase/supabase-js'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { insertRecord } from '@/db/actions'

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
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex h-14 justify-center py-4 text-sm text-muted-foreground">終了</div>
      {user ? (
        <>
          <div>
            <Textarea value={value} placeholder="テキストを入力してください..." className="text-md p-4" onChange={(e) => setValue(e.target.value)} />
          </div>
          <div>
            <Button type="button" disabled={disabled} size="sm" variant="default" onClick={handleSubmit}>
              レコードに追加してホームに戻る
            </Button>
          </div>
          <div>
            <Button asChild size="sm">
              <Link href="/">ホームに戻る</Link>
            </Button>
          </div>
        </>
      ) : (
        <Button asChild size="sm">
          <Link href="/">ホームに戻る</Link>
        </Button>
      )}
    </div>
  )
}
