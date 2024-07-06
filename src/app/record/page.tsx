import { Suspense } from 'react'
import Link from 'next/link'

import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'

import { getRecord, getUser } from '@/db/actions'

export default function RecordPage() {
  return (
    <>
      <div className="px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-x-1">
          <ArrowLeft className="h-5 w-5" />
          Back
        </Link>
        <div className="mt-4">
          <h1 className="text-4xl font-bold">Record</h1>
        </div>
        <div className="mt-4">
          <Suspense fallback={<p>loading...</p>}>
            <Record />
          </Suspense>
        </div>
      </div>
    </>
  )
}

async function Record() {
  const user = await getUser()

  if (!user) {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">データを表示するにはログインしてください</p>
  }

  const record = await getRecord(user?.id ?? '')

  if (!record) {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">データがまだありません。</p>
  } else {
    return (
      <div className="space-y-4">
        {record?.map((r) => (
          <div key={r.id} className="text-sm" style={{ wordBreak: 'break-word' }}>
            <span className="text-muted-foreground">
              <Timestamp date={r.created_at} />
            </span>
            {r.text}
          </div>
        ))}
      </div>
    )
  }
}

function Timestamp({ date }: { date: string }) {
  const utcDate = new Date(date)
  const jstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000)

  return <>{format(jstDate, 'yyyy-MM-dd HH:mm')}: </>
}
