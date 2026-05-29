import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/store/authStore'
import { useTaskStore } from '@/store/taskStore'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#6366f1', '#f59e0b', '#ef4444']

export default function AnalyticsPage() {
  const user = useAuthStore((state) => state.user)
  const tasks = useTaskStore((state) => state.tasks)

  async function handleLogout() {
    await signOut(auth)
  }

  const statusData = [
    { name: 'To Do', value: tasks.filter((t) => t.status === 'todo').length },
    { name: 'In Progress', value: tasks.filter((t) => t.status === 'in-progress').length },
    { name: 'Done', value: tasks.filter((t) => t.status === 'done').length },
  ]

  const priorityData = [
    { name: 'Low', value: tasks.filter((t) => t.priority === 'low').length },
    { name: 'Medium', value: tasks.filter((t) => t.priority === 'medium').length },
    { name: 'High', value: tasks.filter((t) => t.priority === 'high').length },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold">Planify</h1>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Board</Link>
          <Link to="/analytics" className="text-sm text-muted-foreground hover:text-foreground">Analytics</Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">Analytics</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Tasks by Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Tasks by Priority</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {priorityData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  )
}