import { Button } from '@/components/button'
import Temp from '@/components/temp'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function EndPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      {user ? (
        <Temp user={user} />
      ) : (
        <Button>
          <Link href="/">back to top</Link>
        </Button>
      )}
    </>
  )
}
