import { Suspense } from 'react'
import Link from 'next/link'

import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'

import { getRecord, getUser } from '@/db/actions'
import { Record } from '@/type/record'

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
          <Records />
        </Suspense>
      </section>
    </>
  )
}

async function Records() {
  const user = await getUser()

  if (!user) {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">データを表示するにはログインしてください</p>
  }

  const records = await getRecord(user?.id)

  if (records?.length == 0) {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">データがありません。</p>
  }

  return (
    <div className="space-y-4">
      {records?.map((record: Record) => (
        <div key={record.id} className="text-sm" style={{ wordBreak: 'break-word' }}>
          <span className="text-muted-foreground">
            <Timestamp date={record.created_at} />
          </span>
          {record.text}
          <div>{record.created_at}</div>
          <div>{new Date().toUTCString()}</div>
        </div>
      ))}
    </div>
  )
}

function Timestamp({ date }: { date: string }) {
  const ago = daysAgo(date)

  return <>{ago}: </>
}

function daysAgo(date: string) {
  const now = new Date() // location
  const utcNow = new Date(now.toUTCString())
  console.log('any: ', now)
  console.log('utc: ', utcNow)

  const givenDate = new Date(date) // utc
  console.log('given: ', givenDate)
  // 差をミリ秒単位で計算
  const differenceInTime = utcNow.getTime() - givenDate.getTime()

  // 差を日単位に変換
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24))

  if (differenceInDays === 0) {
    // 差を時間単位に変換
    const differenceInHours = Math.floor(differenceInTime / (1000 * 3600))

    if (differenceInHours === 0) {
      // 差を分単位に変換
      const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60))

      if (differenceInMinutes === 0) {
        // 差を秒単位に変換
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
