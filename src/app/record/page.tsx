import { Suspense } from 'react'
import Link from 'next/link'

import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'

import { getRecord, getUser } from '@/db/actions'

export default function RecordPage() {
  return (
    <>
      <section className="mx-auto flex flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <Link href="/" className="flex items-center gap-x-1 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">Record</h1>
        <Suspense fallback={<p>loading...</p>}>
          <Record />
        </Suspense>
      </section>
    </>
  )
}

async function Record() {
  const user = await getUser()

  if (!user) {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">データを表示するにはログインしてください</p>
  }

  const record = await getRecord(user?.id ?? '')

  if (record?.length == 0) {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">データがありません。</p>
  } else {
    return (
      <div className="space-y-2">
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
