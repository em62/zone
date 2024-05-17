import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'

export const ButtonGroup = ({ user }: { user: User | null }) => {
  return (
    <>
      <Button asChild>
        <Link href="/zone">Get in the ZONE</Link>
      </Button>
      {user && (
        <Button asChild variant="outline">
          <Link href="/record">Record</Link>
        </Button>
      )}
    </>
  )
}
