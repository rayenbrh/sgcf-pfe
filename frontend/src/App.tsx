import * as React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { AppShell } from '@/components/layout/AppShell'
import { Login } from '@/features/auth/Login'
import { Dashboard } from '@/features/dashboard/Dashboard'
import { ClientsList } from '@/features/crm/ClientsList'
import { CompaniesList } from '@/features/crm/CompaniesList'
import { DeadlinesList } from '@/features/fiscal/DeadlinesList'
import { InvoicesList } from '@/features/billing/InvoicesList'
import { DocumentsHub } from '@/features/documents/DocumentsHub'
import { AiStudio } from '@/features/ai-studio/AiStudio'
import { Mailbox } from '@/features/mail/Mailbox'
import { TasksList } from '@/features/tasks/TasksList'
import { AuditLogs } from '@/features/audit/AuditLogs'
import { Settings } from '@/features/settings/Settings'
import { useAppStore } from '@/store/useAppStore'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const role = useAppStore(state => state.role)
  if (!role) return <Navigate to="/login" replace />
  return <>{children}</>
}

// Placeholder features
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500">
    <div className="w-16 h-16 rounded-3xl bg-surface-clay flex items-center justify-center shadow-inner-light dark:shadow-inner-dark mb-4">
      <span className="text-2xl">🚧</span>
    </div>
    <h2 className="text-3xl font-extrabold text-text-primary mb-2">{title}</h2>
    <p className="text-text-secondary">This module is currently being built.</p>
  </div>
)

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="clients" element={<ClientsList />} />
            <Route path="clients/:id" element={<Placeholder title="Client Detail" />} />
            <Route path="companies" element={<CompaniesList />} />
            <Route path="companies/:id" element={<Placeholder title="Company Detail" />} />
            
            <Route path="types" element={<Placeholder title="Fiscal Rules" />} />
            <Route path="deadlines" element={<DeadlinesList />} />
            <Route path="billing" element={<InvoicesList />} />
            <Route path="documents" element={<DocumentsHub />} />
            <Route path="ai-studio" element={<AiStudio />} />
            <Route path="mail" element={<Mailbox />} />
            <Route path="tasks" element={<TasksList />} />
            
            <Route path="audit" element={<AuditLogs />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Placeholder title="Not Found" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
