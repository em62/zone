import { format } from 'date-fns'

export const RecordItem = ({ record }: { record: any }) => {
  return (
    <li key={record.id} className="flex justify-between px-4 py-4">
      <div className="text-sm text-muted-foreground">{format(record.created_at, 'yyyy-MM-dd HH:mm')}</div>
    </li>
  )
}
