import * as React from 'react'
import { mockApi, type MOCK_TASKS } from '@/mocks/db'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Plus, Filter, MoreHorizontal } from 'lucide-react'
import { format, parseISO, isPast } from 'date-fns'

type Task = typeof MOCK_TASKS[0]

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: 'border-border-soft' },
  { id: 'in-progress', label: 'In Progress', color: 'border-brand-blue' },
  { id: 'review', label: 'In Review', color: 'border-brand-indigo' },
  { id: 'done', label: 'Done', color: 'border-success-accent' },
]

export function TasksList() {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    mockApi.getTasks().then(data => {
      setTasks(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-in fade-in duration-500 pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-soft pb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Tasks</h1>
          <p className="text-text-secondary mt-1 font-medium">Manage team projects and account workflows.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl shadow-clay-light dark:shadow-clay-dark">
             <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button className="rounded-xl shadow-clay-light dark:shadow-clay-dark">
            <Plus className="w-5 h-5 mr-2" /> New Task
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-96 bg-surface-clay rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto overflow-y-hidden mt-6 pb-4">
          <div className="flex gap-6 h-full min-w-max md:min-w-0">
             {COLUMNS.map(col => {
               const columnTasks = tasks.filter(t => t.status === col.id)
               return (
                 <div key={col.id} className="flex flex-col w-80 shrink-0 h-full bg-surface-clay/50 rounded-[2rem] p-4 border border-border-soft">
                   <div className="flex justify-between items-center mb-4 px-2">
                     <div className="flex items-center space-x-2">
                       <div className={`w-3 h-3 rounded-full border-2 ${col.color} bg-surface`} />
                       <h3 className="font-bold tracking-widest text-sm uppercase text-text-primary">{col.label}</h3>
                       <Badge variant="secondary" className="ml-2 font-bold">{columnTasks.length}</Badge>
                     </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Plus className="w-4 h-4" /></Button>
                   </div>
                   
                   <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-4">
                     {columnTasks.map(task => {
                       const overdue = task.status !== 'done' && isPast(parseISO(task.dueDate))
                       return (
                         <Card key={task.id} className="cursor-grab active:cursor-grabbing hover:-translate-y-1 hover:shadow-clay-light-hover dark:hover:shadow-clay-dark-hover transition-all duration-300">
                           <CardContent className="p-4 flex flex-col space-y-3">
                             <div className="flex justify-between items-start">
                               <Badge variant="clay" className="text-[10px] font-bold uppercase">{task.companyId}</Badge>
                               <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg text-text-muted hover:text-text-primary -mr-2"><MoreHorizontal className="w-4 h-4" /></Button>
                             </div>
                             <p className="font-bold text-sm leading-tight text-text-primary">{task.title}</p>
                             
                             <div className="flex justify-between items-center pt-2">
                               <div className="w-7 h-7 rounded-sm bg-brand-indigo/10 flex items-center justify-center text-xs font-bold text-brand-indigo shrink-0">
                                 {task.assignee.charAt(0)}
                               </div>
                               <div className={`flex items-center text-xs font-semibold ${overdue ? 'text-danger-accent' : 'text-text-muted'}`}>
                                 <Clock className="w-3.5 h-3.5 mr-1" />
                                 {format(parseISO(task.dueDate), 'MMM d')}
                               </div>
                             </div>
                           </CardContent>
                         </Card>
                       )
                     })}
                     {columnTasks.length === 0 && (
                       <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-border-soft rounded-2xl text-text-muted">
                         <span className="text-xs font-medium">Drop tasks here</span>
                       </div>
                     )}
                   </div>
                 </div>
               )
             })}
          </div>
        </div>
      )}
    </div>
  )
}
