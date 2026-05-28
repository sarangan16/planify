import { useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import type { Priority, Status } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function AddTaskDialog() {
  const addTask = useTaskStore((state) => state.addTask)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  function handleAdd() {
    if (!title.trim()) return

    addTask({
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      status: 'todo' as Status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '',
    })

    setTitle('')
    setDescription('')
    setPriority('medium')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Description</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Priority</Label>
            <select
              className="border rounded-md px-3 py-2 text-sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <Button onClick={handleAdd}>Create Task</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}