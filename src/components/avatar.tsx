import Image from 'next/image'

import { PersonIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { getUser } from '@/db/queries'

export async function Avatar() {
  const user = await getUser()

  return user ? (
    <Button className="h-8 w-8 rounded-full" variant="ghost" size="icon" asChild>
      <Image src={user.user_metadata.avatar_url} alt="" width={32} height={32} priority={true} />
    </Button>
  ) : (
    <Button className="px h-8 w-8 rounded-full p-2" variant="secondary" size="icon" asChild>
      <PersonIcon />
    </Button>
  )
}
