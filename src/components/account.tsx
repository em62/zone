import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'

export default async function Account() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signIn = async () => {
    'use server'
    const supabase = createClient()
    const origin = headers().get('origin')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.error(error)
    } else {
      return redirect(data.url)
    }
  }

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
                  <Button variant="outline">ログアウト</Button>
                </form>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <form action={signIn}>
          <button>Login</button>
        </form>
      )}
    </>
  )
}
