import * as React from 'react'
import { mockApi, type MOCK_INVOICES } from '@/mocks/db'
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Download, CreditCard, Send, CheckSquare } from 'lucide-react'
import { format, parseISO } from 'date-fns'

type Invoice = typeof MOCK_INVOICES[0]

export function InvoicesList() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    mockApi.getInvoices().then(data => {
      setInvoices(data)
      setLoading(false)
    })
  }, [])

  const filtered = invoices.filter(inv => inv.id.toLowerCase().includes(search.toLowerCase()) || inv.companyId.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-soft pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Billing & Invoices</h1>
          <p className="text-text-secondary mt-1 font-medium">Manage incoming payments and outstanding balances.</p>
        </div>
        <div className="flex gap-3">
          <Button className="rounded-xl shadow-clay-light dark:shadow-clay-dark" variant="clay">
            Export CSV
          </Button>
          <Button className="rounded-xl shadow-clay-light dark:shadow-clay-dark">
            <CreditCard className="w-5 h-5 mr-2" /> New Invoice
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Search by Invoice ID or Company..." 
            className="pl-10 h-11"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-16 bg-surface-clay rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-text-muted">
                    No invoices match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(inv => (
                  <TableRow key={inv.id} className="cursor-pointer group">
                    <TableCell className="font-bold text-base">{inv.id.toUpperCase()}</TableCell>
                    <TableCell>
                      <span className="text-brand-blue font-semibold hover:underline">
                        {inv.companyId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-extrabold tracking-tight text-lg">€{(inv.amount).toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{format(parseISO(inv.date), 'MMM dd, yyyy')}</span>
                        <span className="text-xs text-text-muted">Due: {format(parseISO(inv.dueDate), 'MMM dd, yyyy')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                       {inv.status === 'paid' && <Badge variant="success">Paid</Badge>}
                       {inv.status === 'pending' && <Badge variant="warning">Pending</Badge>}
                       {inv.status === 'overdue' && <Badge variant="destructive">Overdue</Badge>}
                       {inv.status === 'draft' && <Badge variant="secondary">Draft</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                       <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         {inv.status === 'draft' && (
                           <Button size="icon" variant="ghost" className="text-brand-blue rounded-xl" title="Send Invoice">
                             <Send className="w-4 h-4" />
                           </Button>
                         )}
                         {inv.status === 'pending' && (
                           <Button size="icon" variant="ghost" className="text-success-accent rounded-xl" title="Mark Paid">
                             <CheckSquare className="w-4 h-4" />
                           </Button>
                         )}
                         <Button size="icon" variant="ghost" className="text-text-secondary rounded-xl" title="Download PDF">
                           <Download className="w-4 h-4" />
                         </Button>
                       </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}
