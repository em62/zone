'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { User } from '@supabase/supabase-js'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { getUser, insertRecord } from '@/db/actions'
import { Check, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function End() {
  const [value, setValue] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const handleSubmit = async () => {
    setDisabled(true)
    setLoading(true)

    const error = await insertRecord(value)
    if (!error) {
      setLoading(false)
      setUpdated(true)
      toast('成功', {
        description: 'レコードへの記録に成功しました',
        action: {
          label: '削除',
          onClick: () => {},
        },
      })
    } else {
      console.error()
    }
  }

  useEffect(() => {
    if (value.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [value])

  useEffect(() => {
    const userSetting = async () => {
      const data = await getUser()
      setUser(data)
    }
    userSetting()
  }, [])

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex h-14 justify-center py-4 text-sm text-muted-foreground">終了</div>
      {user && (
        <Card>
          <CardHeader>
            <CardTitle>レコードに追加する</CardTitle>
            <CardDescription>この機能はログインしているユーザー限定のものです。</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Textarea value={value} disabled={updated} placeholder="テキストを入力してください..." className="text-md p-4" onChange={(e) => setValue(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4 sm:flex-row">
            <Button className="w-full sm:w-auto" type="button" disabled={disabled} size="sm" variant="default" onClick={handleSubmit}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  読み込み中...
                </>
              ) : updated ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  レコードに追加済み
                </>
              ) : (
                'レコードに追加する'
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
      <div className="mt-6 px-6">
        <Button asChild className="w-full sm:w-auto" variant="default" size="sm">
          <Link href="/">ホームに戻る</Link>
        </Button>
      </div>
    </div>
  )
}
