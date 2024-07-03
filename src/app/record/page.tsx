import { Button } from '@/components/ui/button'
import { getRecord, getUser } from '@/utils/supabase/actions'
import { format } from 'date-fns'
import Link from 'next/link'
import { Suspense } from 'react'

export default function RecordPage() {
  return (
    <>
      <div className="px-4 py-6">
        <Button asChild variant="outline">
          <Link href="/" className="text-sm text-muted-foreground">
            back
          </Link>
        </Button>
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
  const record = await getRecord(user?.id ?? '')

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

function Timestamp({ date }: { date: string }) {
  const utcDate = new Date(date)
  const jstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000)
  const jstTimeString = jstDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })

  return <>{format(jstTimeString, 'yyyy-MM-dd HH:mm')}: </>
}
