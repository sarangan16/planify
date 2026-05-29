import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import type { Status } from '@/types'
import { useTaskStore } from '@/store/taskStore'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import KanbanColumn from './KanbanColumn'

interface Props {
  filter: 'all' | 'low' | 'medium' | 'high'
}

const columns: { id: Status; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

export default function KanbanBoard({ filter }: Props) {
  const tasks = useTaskStore((state) => state.tasks)
  const moveTask = useTaskStore((state) => state.moveTask)

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t) => t.priority === filter)

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Status

    moveTask(taskId, newStatus)

    await updateDoc(doc(db, 'tasks', taskId), {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={filteredTasks.filter((t) => t.status === col.id)}
          />
        ))}
      </div>
    </DndContext>
  )
}