import Link from 'next/link'
import { Button } from '@/components/button'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-semibold">ZONE</h1>
      <div className="mt-10">
        <Button>
          <Link href="/prepair-first">Let&apos;s get in the zone</Link>
        </Button>
      </div>
      <div className="mt-10"></div>
      <Profile />
    </div>
  )
}

function Login() {
  const signIn = async () => {
    'use server'
    const supabase = createClient()
    const origin = headers().get('origin')

    console.log(origin)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.log(error)
    } else {
      return redirect(data.url)
    }
  }

  return (
    <form action={signIn}>
      <Button>login</Button>
    </form>
  )
}

async function Profile() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      {user ? (
        <>
          <Account user={user} />
          <form action="/auth/signout" method="post">
            <Button>Sign out</Button>
          </form>
        </>
      ) : (
        <Login />
      )}
    </>
  )
}

function Account({ user }: { user: User | null }) {
  return (
    <>
      <div className="h-10 w-10 overflow-hidden rounded-full">
        <Image src={user?.user_metadata?.avatar_url} alt="user avatar" width={40} height={40} />
      </div>
      <div>{user?.email}</div>
    </>
  )
}
