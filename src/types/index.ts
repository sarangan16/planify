export type Priority = 'low' | 'medium' | 'high'

export type Status = 'todo' | 'in-progress' | 'done'

export interface User {
  uid: string
  email: string
  displayName: string | null
}

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  createdAt: string
  updatedAt: string
  userId: string
}

export interface Column {
  id: Status
  title: string
  taskIds: string[]
}

export interface BoardState {
  tasks: Record<string, Task>
  columns: Record<Status, Column>
}