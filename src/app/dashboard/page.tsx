import Record from '@/components/record'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <Link href="/">back to top</Link>
      <h1>Dashboard</h1>
      <Record user={user} />
    </>
  )
}
