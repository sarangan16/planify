import type { Status } from '@/types'
import { useTaskStore } from '@/store/taskStore'
import KanbanColumn from './KanbanColumn'

const columns: { id: Status; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

export default function KanbanBoard() {
  const tasks = useTaskStore((state) => state.tasks)

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((col) => (
        <KanbanColumn
          key={col.id}
          title={col.title}
          tasks={tasks.filter((t) => t.status === col.id)}
        />
      ))}
    </div>
  )
}