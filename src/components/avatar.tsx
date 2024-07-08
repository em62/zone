import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { getUser } from '@/db/actions'
import { CircleUser } from 'lucide-react'
import { PersonIcon } from '@radix-ui/react-icons'

export async function Avatar() {
  const user = await getUser()

  return (
    <>
      {user ? (
        <Button className="h-8 w-8 rounded-full" variant="ghost" size="icon" asChild>
          <Image src={user.user_metadata.avatar_url} alt="" width={32} height={32} />
        </Button>
      ) : (
        <Button className="px h-8 w-8 rounded-full p-2" variant="secondary" size="icon" asChild>
          <PersonIcon />
        </Button>
      )}
    </>
  )
}
