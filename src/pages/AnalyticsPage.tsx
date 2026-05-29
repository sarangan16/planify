import { useTaskStore } from '@/store/taskStore'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#6366f1', '#f59e0b', '#ef4444']

export default function AnalyticsPage() {
  const tasks = useTaskStore((state) => state.tasks)

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
    <div className="p-6">
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
    </div>
  )
}