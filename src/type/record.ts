import { UUID } from 'crypto'

export type Record = {
  id: UUID
  created_at: string
  user_id: UUID
  text: string
}
