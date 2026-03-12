import { create } from 'zustand'

export type Role = 'Admin' | 'Manager' | 'Employee' | 'Client'

interface AppState {
  role: Role
  setRole: (role: Role) => void
  sidebarOpen: boolean
  setSidebarOpen: (isOpen: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  role: 'Admin', // Default demo role
  setRole: (role) => set({ role }),
  sidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
}))
