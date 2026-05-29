import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import KanbanBoard from '@/components/KanbanBoard'
import AddTaskDialog from '@/components/AddTaskDialog'
import { useTasks } from '@/hooks/useTasks'
import ThemeToggle from '@/components/ThemeToggle'
import { useTaskStore } from '@/store/taskStore'


export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  useTasks()
  const tasks = useTaskStore((state) => state.tasks)
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Planify</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">My Board</h2>
          <AddTaskDialog />
        </div>
        <div className="flex gap-2 mb-6">
          {(['all', 'low', 'medium', 'high'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`text-sm px-3 py-1 rounded-full border ${filter === p ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total', count: tasks.length },
            { label: 'To Do', count: tasks.filter((t) => t.status === 'todo').length },
            { label: 'In Progress', count: tasks.filter((t) => t.status === 'in-progress').length },
            { label: 'Done', count: tasks.filter((t) => t.status === 'done').length },
          ].map((stat) => (
            <div key={stat.label} className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.count}</p>
            </div>
          ))}
        </div>
        <KanbanBoard filter={filter} />
      </main>
    </div>
  )
}