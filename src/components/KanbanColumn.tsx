import { useDroppable } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import type { Task, Status } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface CardProps {
  task: Task
}

function TaskCard({ task }: CardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  })

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined

  const priorityColor = {
    low: 'secondary',
    medium: 'outline',
    high: 'destructive',
  } as const

  return (
    <Card ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-grab">
      <CardContent className="p-3 flex flex-col gap-2">
        <p className="text-sm font-medium">{task.title}</p>
        <Badge variant={priorityColor[task.priority]}>{task.priority}</Badge>
      </CardContent>
    </Card>
  )
}

interface ColumnProps {
  id: Status
  title: string
  tasks: Task[]
}

export default function KanbanColumn({ id, title, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className="flex flex-col gap-3 bg-muted/50 rounded-lg p-4 min-w-[300px]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">{tasks.length}</span>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}