import Record from '@/components/record'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function RecordPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <div className="px-4 py-6">
        <Link href="/" className="text-sm text-[#a1a1aa]">
          ← back
        </Link>
        <div className="mt-4">
          <h1 className="text-4xl font-bold">Record</h1>
        </div>
        <div className="mt-2">
          <p className="text-md text-[#A1A1AA]">
            A vertically stacked set of
            <br />
            interactive headings that each
            <br />
            reveal a section of content.
          </p>
        </div>
        {/* <Record user={user} /> */}
      </div>
    </>
  )
}
