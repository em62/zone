'use client'

import { getRecord, getUser } from '@/db/actions'
import { Record } from '@/type/record'
import { useEffect, useState } from 'react'
import { useDataContext } from './context'

export function Rec() {
  const [records, setRecords] = useState<Record[] | null>(null)
  const { user } = useDataContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const a = async () => {
        const data = await getRecord(user?.id ?? '')
        setRecords(data)
        setLoading(false)
      }

      a()
    }
  }, [user])

  return (
    <>
      {loading ? (
        <>loading...</>
      ) : (
        <div className="space-y-4">
          {records?.map((record: Record) => (
            <div key={record.id} className="text-sm" style={{ wordBreak: 'break-word' }}>
              <span className="text-muted-foreground">
                <>{daysAgo(record.created_at)}: </>
              </span>
              {record.text}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function daysAgo(date: string) {
  const now = new Date().toUTCString()
  const created_at = new Date(date).getTime()
  const differenceInTime = Date.parse(now) - created_at
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24))

  if (differenceInDays === 0) {
    const differenceInHours = Math.floor(differenceInTime / (1000 * 3600))

    if (differenceInHours === 0) {
      const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60))

      if (differenceInMinutes === 0) {
        const differenceInSeconds = Math.floor(differenceInTime / 1000)
        return `${differenceInSeconds}秒前`
      } else {
        return `${differenceInMinutes}分前`
      }
    } else {
      return `${differenceInHours}時間前`
    }
  } else {
    return `${differenceInDays}日前`
  }
}
