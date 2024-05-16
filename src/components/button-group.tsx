import Link from 'next/link'
import { Button } from './button'
import { User } from '@supabase/supabase-js'

export const ButtonGroup = ({ user }: { user: User | null }) => {
  return (
    <>
      <Button>
        <Link href="/zone">Get in the ZONE</Link>
      </Button>
      {user && (
        <Button>
          <Link href="/record">Record</Link>
        </Button>
      )}
    </>
  )
}
