import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import Account from '@/components/account'
import { ButtonGroup } from '@/components/button-group'
import { ModeToggle } from '@/components/mode-toggle'

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="mt-4 flex h-10 w-full items-center justify-between px-4">
        <Suspense fallback={<p>loading...</p>}>
          <Account />
        </Suspense>
        <ModeToggle />
      </div>
      <h1 className="text-4xl font-semibold">ZONE</h1>
      <div className="mb-8 flex items-center gap-x-4">
        <ButtonGroup user={user} />
      </div>
    </div>
  )
}
