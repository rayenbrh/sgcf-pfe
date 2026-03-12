import { subDays, subMonths, addDays, formatISO } from 'date-fns'

const now = new Date()

export const MOCK_CLIENTS = [
  { id: 'c1', name: 'TechVision Solutions', contact: 'Marie Durand', email: 'marie@techvision.fr', phone: '+33 1 23 45 67 89', status: 'active', tags: ['VIP', 'Technology'] },
  { id: 'c2', name: 'Artisanat & Co', contact: 'Pierre Martin', email: 'contact@artisanatco.fr', phone: '+33 4 56 78 90 12', status: 'active', tags: ['Retail'] },
  { id: 'c3', name: 'Logistique Express', contact: 'Sophie Bernard', email: 's.bernard@logexpress.com', phone: '+33 6 11 22 33 44', status: 'inactive', tags: ['Transport'] },
  { id: 'c4', name: 'Bureau Santé', contact: 'Dr. Jean Dupont', email: 'jean@bureaubante.fr', phone: '+33 5 98 76 54 32', status: 'active', tags: ['Medical'] },
]

export const MOCK_COMPANIES = [
  { id: 'co1', clientId: 'c1', name: 'TechVision Cloud SARL', type: 'SARL', siren: '123 456 789', vatNumber: 'FR 12 123456789', status: 'active', revenue: 1500000, employees: 14 },
  { id: 'co2', clientId: 'c1', name: 'TechVision AI SAS', type: 'SAS', siren: '987 654 321', vatNumber: 'FR 98 987654321', status: 'active', revenue: 800000, employees: 5 },
  { id: 'co3', clientId: 'c2', name: 'Boulangerie Martin', type: 'EURL', siren: '555 666 777', vatNumber: 'FR 55 555666777', status: 'active', revenue: 350000, employees: 4 },
  { id: 'co4', clientId: 'c4', name: 'Cabinet Médical Sud', type: 'SELARL', siren: '111 222 333', vatNumber: 'FR 11 111222333', status: 'active', revenue: 450000, employees: 3 },
]

export const MOCK_INVOICES = [
  { id: 'inv_101', companyId: 'co1', amount: 4500, status: 'paid', date: formatISO(subDays(now, 15)), dueDate: formatISO(subDays(now, 1)) },
  { id: 'inv_102', companyId: 'co1', amount: 1200, status: 'overdue', date: formatISO(subMonths(now, 2)), dueDate: formatISO(subMonths(now, 1)) },
  { id: 'inv_103', companyId: 'co2', amount: 8900, status: 'pending', date: formatISO(subDays(now, 2)), dueDate: formatISO(addDays(now, 12)) },
  { id: 'inv_104', companyId: 'co3', amount: 450, status: 'paid', date: formatISO(subDays(now, 30)), dueDate: formatISO(subDays(now, 15)) },
  { id: 'inv_105', companyId: 'co4', amount: 2100, status: 'draft', date: formatISO(now), dueDate: formatISO(addDays(now, 30)) },
]

export const MOCK_DEADLINES = [
  { id: 'dl_1', companyId: 'co1', title: 'TVA Mensuelle', type: 'Tax', date: formatISO(addDays(now, 5)), status: 'pending', priority: 'high' },
  { id: 'dl_2', companyId: 'co2', title: 'TVA Mensuelle', type: 'Tax', date: formatISO(addDays(now, 5)), status: 'completed', priority: 'high' },
  { id: 'dl_3', companyId: 'co3', title: 'Bilan Annuel', type: 'Accounting', date: formatISO(subDays(now, 2)), status: 'overdue', priority: 'high' },
  { id: 'dl_4', companyId: 'co4', title: 'Déclaration Sociale', type: 'Payroll', date: formatISO(addDays(now, 12)), status: 'pending', priority: 'medium' },
]

export const MOCK_DOCUMENTS = [
  { id: 'doc_1', companyId: 'co1', name: 'Kbis_TechVision.pdf', size: '1.2 MB', type: 'pdf', uploadDate: formatISO(subDays(now, 45)), folder: 'Legal' },
  { id: 'doc_2', companyId: 'co1', name: 'Bilan_2023.pdf', size: '4.5 MB', type: 'pdf', uploadDate: formatISO(subMonths(now, 3)), folder: 'Accounting' },
  { id: 'doc_3', companyId: 'co2', name: 'Factures_Janvier.zip', size: '12 MB', type: 'zip', uploadDate: formatISO(subDays(now, 12)), folder: 'Billing' },
  { id: 'doc_4', companyId: 'co3', name: 'Contrat_Bail.docx', size: '800 KB', type: 'word', uploadDate: formatISO(subMonths(now, 8)), folder: 'Legal' },
]

export const MOCK_TASKS = [
  { id: 't_1', title: 'Review Q1 statements for TechVision', status: 'in-progress', assignee: 'Manager', companyId: 'co1', dueDate: formatISO(addDays(now, 2)) },
  { id: 't_2', title: 'Chase missing invoices Boulangerie', status: 'todo', assignee: 'Employee', companyId: 'co3', dueDate: formatISO(addDays(now, 5)) },
  { id: 't_3', title: 'Prepare URSSAF declaration', status: 'done', assignee: 'Employee', companyId: 'co4', dueDate: formatISO(subDays(now, 1)) },
  { id: 't_4', title: 'Client onboarding meeting', status: 'review', assignee: 'Admin', companyId: 'co2', dueDate: formatISO(now) },
]

export const MOCK_EMAILS = [
  { id: 'm_1', sender: 'Marie Durand', subject: 'Missing invoices for January', preview: 'Hi team, please find attached the missing...', date: formatISO(subDays(now, 1)), read: false, folder: 'inbox' },
  { id: 'm_2', sender: 'System', subject: 'Tax declaration successful', preview: 'The URSSAF declaration for Cabinet Médical...', date: formatISO(subDays(now, 2)), read: true, folder: 'inbox' },
  { id: 'm_3', sender: 'Pierre Martin', subject: 'Question regarding Q3 payroll', preview: 'Could you please clarify the new rate...', date: formatISO(subDays(now, 5)), read: true, folder: 'inbox' },
  { id: 'm_4', sender: 'Me', subject: 'Re: Missing invoices for January', preview: 'Received, thank you Marie. We will process...', date: formatISO(now), read: true, folder: 'sent' },
]

export const MOCK_AI_GENERATIONS = [
  { id: 'ai_1', type: 'Email Outline', prompt: 'Ask Pierre for missing retail receipts', tokens: 120, status: 'success', date: formatISO(subDays(now, 2)) },
  { id: 'ai_2', type: 'Contract Review', prompt: 'Analyze lease agreement for TechVision', tokens: 4500, status: 'success', date: formatISO(subDays(now, 5)) },
  { id: 'ai_3', type: 'Financial Summary', prompt: 'Summarize Q4 performance for Boulangerie Martin', tokens: 2300, status: 'success', date: formatISO(now) },
]

export const MOCK_AUDIT_LOGS = [
  { id: 'log_1', action: 'User Login', user: 'Admin', module: 'Auth', timestamp: formatISO(now), status: 'success' },
  { id: 'log_2', action: 'Document Upload', user: 'Employee', module: 'Documents', timestamp: formatISO(subDays(now, 1)), status: 'success' },
  { id: 'log_3', action: 'Delete Invoice', user: 'Manager', module: 'Billing', timestamp: formatISO(subDays(now, 2)), status: 'warning' },
  { id: 'log_4', action: 'Tax Submission', user: 'System', module: 'Deadlines', timestamp: formatISO(subDays(now, 3)), status: 'success' },
  { id: 'log_5', action: 'Failed Login', user: 'Unknown', module: 'Auth', timestamp: formatISO(subDays(now, 4)), status: 'danger' },
]

// Mock network delay wrapper
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
  getClients: async () => { await delay(800); return MOCK_CLIENTS },
  getCompanies: async () => { await delay(600); return MOCK_COMPANIES },
  getInvoices: async () => { await delay(1000); return MOCK_INVOICES },
  getDeadlines: async () => { await delay(700); return MOCK_DEADLINES },
  getDocuments: async () => { await delay(1200); return MOCK_DOCUMENTS },
  getTasks: async () => { await delay(500); return MOCK_TASKS },
  getEmails: async () => { await delay(900); return MOCK_EMAILS },
  getAiGenerations: async () => { await delay(600); return MOCK_AI_GENERATIONS },
  getAuditLogs: async () => { await delay(400); return MOCK_AUDIT_LOGS },
  getDashboardStats: async () => {
    await delay(1000)
    return {
      totalRevenue: 3450000,
      activeClients: 124,
      pendingDeadlines: 8,
      avgCollectionDays: 24
    }
  }
}
