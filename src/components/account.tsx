import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'

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
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <form action="/auth/signout" method="post">
            <button>
              <Image src={user?.user_metadata?.avatar_url} alt="user avatar" width={40} height={40} />
            </button>
          </form>
        </div>
      ) : (
        <form action={signIn}>
          <button className="ml-auto">Login</button>
        </form>
      )}
    </>
  )
}
