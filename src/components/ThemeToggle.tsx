import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <Button variant="outline" size="sm" onClick={() => setDark(!dark)}>
      {dark ? 'Light' : 'Dark'}
    </Button>
  )
}