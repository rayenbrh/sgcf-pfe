import * as React from 'react'
import { mockApi, type MOCK_DEADLINES } from '@/mocks/db'
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { format, parseISO, isPast } from 'date-fns'

type Deadline = typeof MOCK_DEADLINES[0]

export function DeadlinesList() {
  const [deadlines, setDeadlines] = React.useState<Deadline[]>([])
  const [loading, setLoading] = React.useState(true)
  const [filter, setFilter] = React.useState('all')

  React.useEffect(() => {
    mockApi.getDeadlines().then(data => {
      setDeadlines(data)
      setLoading(false)
    })
  }, [])

  const filtered = deadlines.filter(d => {
    if (filter === 'all') return true
    return d.status === filter
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-soft pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Deadlines</h1>
          <p className="text-text-secondary mt-1 font-medium">Track your compliance and fiscal obligations.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl shadow-clay-light dark:shadow-clay-dark">
             <Calendar className="w-4 h-4 mr-2" />
             Calendar View
          </Button>
          <Button className="rounded-xl shadow-clay-light dark:shadow-clay-dark">
            New Deadline
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button variant={filter === 'all' ? 'clay' : 'ghost'} onClick={() => setFilter('all')} className="rounded-2xl">
          All
        </Button>
        <Button variant={filter === 'pending' ? 'clay' : 'ghost'} onClick={() => setFilter('pending')} className="rounded-2xl text-warning-text">
          <Clock className="w-4 h-4 mr-2" /> Pending
        </Button>
        <Button variant={filter === 'overdue' ? 'clay' : 'ghost'} onClick={() => setFilter('overdue')} className="rounded-2xl text-danger-text">
          <AlertCircle className="w-4 h-4 mr-2" /> Overdue
        </Button>
        <Button variant={filter === 'completed' ? 'clay' : 'ghost'} onClick={() => setFilter('completed')} className="rounded-2xl text-success-text">
          <CheckCircle2 className="w-4 h-4 mr-2" /> Completed
        </Button>
      </div>

      {loading ? (
         <div className="space-y-4">
           {[...Array(4)].map((_, i) => <div key={i} className="w-full h-16 bg-surface-clay rounded-2xl animate-pulse" />)}
         </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Obligation</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Deadline Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-text-muted">
                    No deadlines match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(dl => {
                  const dateObj = parseISO(dl.date)
                  const overdue = dl.status !== 'completed' && isPast(dateObj)
                  
                  return (
                    <TableRow key={dl.id} className="cursor-pointer group">
                      <TableCell className="font-bold text-base">{dl.title}</TableCell>
                      <TableCell>
                        <span className="text-brand-blue font-semibold hover:underline">
                          {dl.companyId}
                        </span>
                      </TableCell>
                      <TableCell>
                         <Badge variant="clay" className="text-[10px] uppercase font-bold tracking-wider">{dl.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={overdue ? "text-danger-accent font-bold" : "text-text-primary font-medium"}>
                          {format(dateObj, 'MMM dd, yyyy')}
                        </span>
                      </TableCell>
                      <TableCell>
                         {dl.status === 'completed' && <Badge variant="success">Completed</Badge>}
                         {dl.status === 'pending' && <Badge variant={overdue ? "destructive" : "warning"}>{overdue ? 'Overdue' : 'Pending'}</Badge>}
                         {dl.status === 'overdue' && <Badge variant="destructive">Overdue</Badge>}
                      </TableCell>
                      <TableCell className="text-right opacity-0 group-hover:opacity-100 transition-opacity">
                         {dl.status !== 'completed' && (
                           <Button size="sm" variant="outline" className="rounded-xl border-success-accent text-success-accent hover:bg-success-bg">
                             Mark Done
                           </Button>
                         )}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}
