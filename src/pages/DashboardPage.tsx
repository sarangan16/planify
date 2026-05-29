import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import KanbanBoard from '@/components/KanbanBoard'
import AddTaskDialog from '@/components/AddTaskDialog'
import { useTasks } from '@/hooks/useTasks'
import ThemeToggle from '@/components/ThemeToggle'

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  useTasks()

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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">My Board</h2>
          <AddTaskDialog />
        </div>
        <KanbanBoard />
      </main>
    </div>
  )
}