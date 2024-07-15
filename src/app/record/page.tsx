import { Suspense } from 'react'
import Link from 'next/link'

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
            <>{daysAgo(record.created_at)}: </>
          </span>
          {record.text}
        </div>
      ))}
    </div>
  )
}

function daysAgo(date: string) {
  const now = new Date().toUTCString()
  // console.log(now)
  // const s = Date.parse(now)
  // const parts: any = date.split(/[-T:.]/)
  // console.log(parts)
  // const givenDate = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5], parts[6]))
  // console.log(givenDate)
  // const parts: string[] = date.split(/[-T:.]/)
  // console.log(parts)
  // const givenDate = new Date(date)
  const created_at = new Date(date).toString()
  return `created_at: ${created_at} \n now: ${now}`
  // const givenDate = new Date(parse)
  // console.log(givenDate)

  // const differenceInTime = s - parse
  // const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24))

  // if (differenceInDays === 0) {
  //   const differenceInHours = Math.floor(differenceInTime / (1000 * 3600))

  //   if (differenceInHours === 0) {
  //     const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60))

  //     if (differenceInMinutes === 0) {
  //       const differenceInSeconds = Math.floor(differenceInTime / 1000)
  //       return `${differenceInSeconds}秒前`
  //     } else {
  //       return `${differenceInMinutes}分前`
  //     }
  //   } else {
  //     return `${differenceInHours}時間前`
  //   }
  // } else {
  //   return `${differenceInDays}日前`
  // }
}
