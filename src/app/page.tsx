import Link from 'next/link'
import { Button } from '@/components/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-semibold">ZONE</h1>
      <div className="mt-10">
        <Button>
          <Link href="/prepair-first">Let&apos;s get in the zone</Link>
        </Button>
      </div>
    </div>
  )
}
