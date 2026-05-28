import type { Task } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
  title: string
  tasks: Task[]
}

const priorityColor = {
  low: 'secondary',
  medium: 'outline',
  high: 'destructive',
} as const

export default function KanbanColumn({ title, tasks }: Props) {
  return (
    <div className="flex flex-col gap-3 bg-muted/50 rounded-lg p-4 min-w-[300px]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">{tasks.length}</span>
      </div>
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="p-3 flex flex-col gap-2">
            <p className="text-sm font-medium">{task.title}</p>
            <Badge variant={priorityColor[task.priority]}>{task.priority}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}