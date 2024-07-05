import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { getUser, signIn } from '@/db/actions'

export const Account = async () => {
  const user = await getUser()

  return (
    <>
      {user ? (
        <Dialog>
          <DialogTrigger>
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image src={user?.user_metadata?.avatar_url} alt="user avatar" width={40} height={40} />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>アカウント情報</DialogTitle>
              <div className="flex items-center justify-center gap-x-4 pt-4">
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <Image src={user?.user_metadata?.avatar_url} alt="user avatar" width={40} height={40} />
                </div>
                <div className="text-muted-foreground">{user.user_metadata.email}</div>
              </div>
              <div className="pt-6">
                <form action="/auth/signout" method="post">
                  <Button variant="outline">signout</Button>
                </form>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <form action={signIn}>
          <button>Sign In</button>
        </form>
      )}
    </>
  )
}
