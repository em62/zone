import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'

export const ButtonGroup = async () => {
  const db = createClient()
  const {
    data: { user },
  } = await db.auth.getUser()

  return (
    <>
      <Button asChild>
        <Link href="/zone">Get Started</Link>
      </Button>
      {user && (
        <Button asChild variant="outline">
          <Link href="/record">Record</Link>
        </Button>
      )}
    </>
  )
}
