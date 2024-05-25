import { Record } from '@/components/record/record'
import { Button } from '@/components/ui/button'
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
        <div className="mt-2">
          <p className="text-md text-muted-foreground">
            レコードではログイン時にZONEに
            <br />
            入った記録を確認することができます。
          </p>
        </div>
        <Suspense fallback={<p>loading...</p>}>
          <Record />
        </Suspense>
      </div>
    </>
  )
}
