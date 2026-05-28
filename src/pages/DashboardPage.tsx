import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Planify</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">My Board</h2>
        <p className="text-muted-foreground">Kanban board coming here...</p>
      </main>
    </div>
  )
}