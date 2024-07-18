import { Suspense } from 'react'
import Image from 'next/image'

import { PersonIcon } from '@radix-ui/react-icons'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { signIn } from '@/db/actions'
import { getUser } from '@/db/queries'

export async function Drawer() {
  const user = await getUser()

  return (
    <Sheet>
      <SheetTrigger>
        <Suspense>
          <Avatar />
        </Suspense>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="t">
          <SheetTitle className="flex gap-x-2">
            {user ? (
              <div className="overflow-hidden rounded-full">
                <Image src={user?.user_metadata.avatar_url} alt="" width={24} height={24} />
              </div>
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                <PersonIcon className="h-3 w-3" />
              </div>
            )}
            <div>{user?.user_metadata.name ?? 'Guest User'}</div>
          </SheetTitle>
          <SheetDescription>{user?.user_metadata.email}</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Theme</div>
            <ModeToggle />
          </div>
        </div>
        <SheetFooter className="mt-4">
          {user ? (
            <form action="/auth/signout" method="post">
              <Button type="submit" size="sm">
                Sign Out
              </Button>
            </form>
          ) : (
            <form action={signIn}>
              <Button type="submit">Sign In</Button>
            </form>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
