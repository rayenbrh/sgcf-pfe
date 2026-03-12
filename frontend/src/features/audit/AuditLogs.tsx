import * as React from 'react'
import { mockApi, type MOCK_AUDIT_LOGS } from '@/mocks/db'
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Download, ShieldAlert } from 'lucide-react'
import { format, parseISO } from 'date-fns'

type Log = typeof MOCK_AUDIT_LOGS[0]

export function AuditLogs() {
  const [logs, setLogs] = React.useState<Log[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    mockApi.getAuditLogs().then(data => {
      setLogs(data)
      setLoading(false)
    })
  }, [])

  const filtered = logs.filter(l => l.action.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-soft pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center">
            <ShieldAlert className="w-8 h-8 text-brand-indigo mr-3" />
            Audit Logs
          </h1>
          <p className="text-text-secondary mt-1 font-medium">Monitor system events, user actions, and security alerts.</p>
        </div>
        <Button className="rounded-xl shadow-clay-light dark:shadow-clay-dark" variant="clay">
          <Download className="w-5 h-5 mr-2" /> Export Logs
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Search events or users..." 
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
                <TableHead>Timestamp</TableHead>
                <TableHead>Event Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>User / IP</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-text-muted">
                    No logs match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(log => (
                  <TableRow key={log.id} className="cursor-pointer">
                    <TableCell className="font-semibold text-text-secondary whitespace-nowrap">
                      {format(parseISO(log.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell className="font-bold text-base">{log.action}</TableCell>
                    <TableCell>
                      <Badge variant="clay" className="text-[10px] uppercase font-bold tracking-wider">{log.module}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-text-primary bg-surface-clay px-3 py-1 rounded-lg">{log.user}</span>
                    </TableCell>
                    <TableCell>
                      {log.status === 'success' && <div className="w-3 h-3 rounded-full bg-success-accent mx-4" title="Success" />}
                      {log.status === 'warning' && <div className="w-3 h-3 rounded-full bg-warning-accent mx-4" title="Warning" />}
                      {log.status === 'danger' && <div className="w-3 h-3 rounded-full bg-danger-accent animate-[pulse_1.5s_ease-in-out_infinite] mx-4" title="Danger" />}
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
