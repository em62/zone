import { createClient } from '@/utils/supabase/server'
import { RecordList } from './record-list'
import { RecordStatus } from './record-status'

export const Record = async () => {
  const db = createClient()
  const {
    data: { user },
  } = await db.auth.getUser()

  return (
    <>
      {user ? (
        <>
          <RecordStatus user={user} />
          <RecordList user={user} />
        </>
      ) : (
        <p>you must be login</p>
      )}
    </>
  )
}
