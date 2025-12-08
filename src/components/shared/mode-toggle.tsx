import { Moon, Sun } from 'lucide-react'


import { useTheme } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div >
      {theme === 'light' ? (
        <div>
          <Button variant={'outline'}  onClick={() => {setTheme("dark")}}>
            <Moon />
          </Button>
        </div>
      ) : (
        <Button variant={'outline'}  onClick={() => {setTheme("light")}}>
          <Sun />
        </Button>
      )}
    </div>
  )
}
