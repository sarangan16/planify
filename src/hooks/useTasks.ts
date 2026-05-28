import { useEffect } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useTaskStore } from '@/store/taskStore'
import { useAuthStore } from '@/store/authStore'
import type { Task } from '@/types'

export function useTasks() {
  const setTasks = useTaskStore((state) => state.setTasks)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (!user) return

    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks: Task[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Task),
        id: doc.id,
      }))
      setTasks(tasks)
    })

    return () => unsubscribe()
  }, [user, setTasks])
}