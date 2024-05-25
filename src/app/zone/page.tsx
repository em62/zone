import { CurrentPhase } from '@/components/zone/phase'
import { createClient } from '@/utils/supabase/server'

export default async function Zone() {
  const db = createClient()
  const {
    data: { user },
  } = await db.auth.getUser()

  return <CurrentPhase user={user} />
}
