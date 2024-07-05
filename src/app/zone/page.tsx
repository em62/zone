import { CurrentPhase } from '@/components/zone/phase'
import { getUser } from '@/db/actions'

export default async function Page() {
  const user = await getUser()

  return <CurrentPhase user={user} />
}
