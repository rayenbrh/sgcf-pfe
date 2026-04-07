import * as React from 'react'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'
import {
  BarChart, Users, Building, Calendar,
  CreditCard, FileText, Sparkles, Mail,
  CheckSquare, Activity, Settings, LogOut
} from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

const getNavItems = (role: string) => {
  const items = [
    { name: 'Dashboard', icon: BarChart, path: '/dashboard', roles: ['admin', 'manager', 'employe', 'client'] },
    { name: 'Clients', icon: Users, path: '/clients', roles: ['admin', 'manager', 'employe'] },
    { name: 'Companies', icon: Building, path: '/companies', roles: ['admin', 'manager', 'employe', 'client'] },
    { name: 'Fiscal Rules', icon: Calendar, path: '/types', roles: ['admin', 'manager'] },
    { name: 'Deadlines', icon: Calendar, path: '/deadlines', roles: ['admin', 'manager', 'employe', 'client'] },
    { name: 'Billing', icon: CreditCard, path: '/billing', roles: ['admin', 'manager', 'client'] },
    { name: 'Documents', icon: FileText, path: '/documents', roles: ['admin', 'manager', 'employe', 'client'] },
    { name: 'AI Studio', icon: Sparkles, path: '/ai-studio', roles: ['admin', 'manager', 'client'] },
    { name: 'Mail', icon: Mail, path: '/mail', roles: ['admin', 'manager', 'employe', 'client'] },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks', roles: ['admin', 'manager', 'employe'] },
    { name: 'Audit', icon: Activity, path: '/audit', roles: ['admin'] },
    { name: 'Settings', icon: Settings, path: '/settings', roles: ['admin', 'manager'] },
  ]
  return items.filter((i) => i.roles.includes(role))
}

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { user, logout } = useAuth()
  const role = user?.role ?? ''
  const navItems = getNavItems(role)
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen)

  const initial = user ? `${user.firstName?.charAt(0) ?? ''}${user.lastName?.charAt(0) ?? ''}`.trim() || '?' : '?'

  return (
    <aside className={cn("hidden md:flex flex-col w-64 h-screen bg-surface border-r border-border-soft shadow-sm z-20 transition-all", className)}>
      <div className="h-16 flex items-center px-6 border-b border-border-soft">
        <Sparkles className="w-6 h-6 text-brand-blue mr-2" />
        <span className="font-bold text-lg tracking-tight">SGCF</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-brand-blue/10 text-brand-blue shadow-inner-light dark:shadow-inner-dark"
                  : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
              )
            }
          >
            <item.icon className="w-5 h-5 mr-3 shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-border-soft space-y-3">
        <div className="flex items-center space-x-3 bg-surface-clay p-3 rounded-2xl shadow-inner-light dark:shadow-inner-dark">
          <div className="w-8 h-8 rounded-full bg-brand-indigo text-white flex items-center justify-center font-bold text-xs shrink-0">
            {initial}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-medium leading-tight truncate">
              {user ? `${user.firstName} ${user.lastName}` : ''}
            </span>
            <span className="text-xs text-text-muted mt-1 truncate">{user?.role}</span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl justify-center gap-2"
          onClick={() => logout()}
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </Button>
      </div>
    </aside>
  )
}
