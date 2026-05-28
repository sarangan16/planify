import { create } from 'zustand'
import type { Task, Status } from '../types'

interface TaskStore {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, status: Status) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),

  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  moveTask: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),
}))