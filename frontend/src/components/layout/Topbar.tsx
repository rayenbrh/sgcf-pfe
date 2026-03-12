import { Bell, Search, Menu, Moon, Sun, ArrowLeftRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppStore, type Role } from '@/store/useAppStore'
import { useTheme } from 'next-themes'

const ROLES: Role[] = ['Admin', 'Manager', 'Employee', 'Client']

export function Topbar() {
  const { theme, setTheme } = useTheme()
  const { setSidebarOpen, role, setRole } = useAppStore()

  const nextRole = () => {
    const idx = ROLES.indexOf(role)
    setRole(ROLES[(idx + 1) % ROLES.length])
  }

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-surface border-b border-border-soft z-10 sticky top-0 transition-colors">
      <div className="flex items-center flex-1">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-5 h-5 text-text-secondary" />
        </Button>
        <div className="hidden md:flex relative w-96">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <Input placeholder="Search everywhere..." className="pl-10 h-10 rounded-2xl bg-surface-clay" />
        </div>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="outline" size="sm" onClick={nextRole} className="hidden sm:flex rounded-xl font-semibold border-brand-indigo/20 text-brand-indigo bg-brand-indigo/5" title="Switch Demo Role">
          <ArrowLeftRight className="w-4 h-4 mr-2" />
          {role}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <Sun className="h-5 w-5 hidden dark:block text-text-secondary" />
          <Moon className="h-5 w-5 dark:hidden text-text-secondary" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl relative">
          <Bell className="h-5 w-5 text-text-secondary" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-rose border-2 border-surface" />
        </Button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-blue to-brand-indigo shadow-clay-light-sm dark:shadow-clay-dark-sm border-2 border-surface" />
      </div>
    </header>
  )
}
