import * as React from 'react'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'
import { 
  BarChart, Users, Building, Calendar, 
  CreditCard, FileText, Sparkles, Mail, 
  CheckSquare, Activity, Settings
} from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

const getNavItems = (role: string) => {
  const items = [
    { name: 'Dashboard', icon: BarChart, path: '/dashboard', roles: ['Admin', 'Manager', 'Employee', 'Client'] },
    { name: 'Clients', icon: Users, path: '/clients', roles: ['Admin', 'Manager', 'Employee'] },
    { name: 'Companies', icon: Building, path: '/companies', roles: ['Admin', 'Manager', 'Employee', 'Client'] },
    { name: 'Fiscal Rules', icon: Calendar, path: '/types', roles: ['Admin', 'Manager'] },
    { name: 'Deadlines', icon: Calendar, path: '/deadlines', roles: ['Admin', 'Manager', 'Employee', 'Client'] },
    { name: 'Billing', icon: CreditCard, path: '/billing', roles: ['Admin', 'Manager', 'Client'] },
    { name: 'Documents', icon: FileText, path: '/documents', roles: ['Admin', 'Manager', 'Employee', 'Client'] },
    { name: 'AI Studio', icon: Sparkles, path: '/ai-studio', roles: ['Admin', 'Manager', 'Client'] },
    { name: 'Mail', icon: Mail, path: '/mail', roles: ['Admin', 'Manager', 'Employee', 'Client'] },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks', roles: ['Admin', 'Manager', 'Employee'] },
    { name: 'Audit', icon: Activity, path: '/audit', roles: ['Admin'] },
    { name: 'Settings', icon: Settings, path: '/settings', roles: ['Admin', 'Manager'] },
  ]
  return items.filter(i => i.roles.includes(role))
}

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const role = useAppStore(state => state.role)
  const navItems = getNavItems(role)

  return (
    <aside className={cn("hidden md:flex flex-col w-64 h-screen bg-surface border-r border-border-soft shadow-sm z-20 transition-all", className)}>
      <div className="h-16 flex items-center px-6 border-b border-border-soft">
        <Sparkles className="w-6 h-6 text-brand-blue mr-2" />
        <span className="font-bold text-lg tracking-tight">FinAI</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
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
      <div className="p-4 border-t border-border-soft">
         <div className="flex items-center space-x-3 bg-surface-clay p-3 rounded-2xl shadow-inner-light dark:shadow-inner-dark">
            <div className="w-8 h-8 rounded-full bg-brand-indigo text-white flex items-center justify-center font-bold text-xs">
              {role.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">{role} User</span>
              <span className="text-xs text-text-muted mt-1">{role}</span>
            </div>
         </div>
      </div>
    </aside>
  )
}
