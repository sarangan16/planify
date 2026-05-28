import { useDroppable, useDraggable } from '@dnd-kit/core'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useTaskStore } from '@/store/taskStore'
import type { Task, Status } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface CardProps {
  task: Task
}

function TaskCard({ task }: CardProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask)
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

  async function handleDelete() {
    deleteTask(task.id)
    await deleteDoc(doc(db, 'tasks', task.id))
  }

  return (
    <Card className="cursor-default">
      <CardContent className="p-3 flex flex-col gap-2">
        <div
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
          className="cursor-grab"
        >
          <p className="text-sm font-medium">{task.title}</p>
        </div>
        <Badge variant={priorityColor[task.priority]}>{task.priority}</Badge>
        <button
          onClick={handleDelete}
          className="text-xs text-muted-foreground hover:text-red-500 self-end"
        >
          Delete
        </button>
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