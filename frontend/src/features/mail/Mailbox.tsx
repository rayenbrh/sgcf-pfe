import * as React from 'react'
import { mockApi, type MOCK_EMAILS } from '@/mocks/db'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Inbox, Send, File, Trash, Search, Mail,
  CornerUpLeft, MoreVertical, Sparkles
} from 'lucide-react'
import { format, parseISO } from 'date-fns'

type Email = typeof MOCK_EMAILS[0]

export function Mailbox() {
  const [emails, setEmails] = React.useState<Email[]>([])
  const [loading, setLoading] = React.useState(true)
  const [activeFolder, setActiveFolder] = React.useState('inbox')
  const [activeEmail, setActiveEmail] = React.useState<Email | null>(null)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    mockApi.getEmails().then(data => {
      setEmails(data)
      setLoading(false)
    })
  }, [])

  const filtered = emails.filter(e => {
    const matchesSearch = e.subject.toLowerCase().includes(search.toLowerCase()) || e.sender.toLowerCase().includes(search.toLowerCase())
    const matchesFolder = e.folder === activeFolder
    return matchesSearch && matchesFolder
  })

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-in fade-in duration-500 pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-soft pb-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center">
            Inbox
          </h1>
          <p className="text-text-secondary mt-1 font-medium">Communicate securely with your team and clients.</p>
        </div>
        <Button className="rounded-xl shadow-clay-light dark:shadow-clay-dark" size="lg">
           <Mail className="w-5 h-5 mr-2" /> Compose
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden mt-6 gap-6 rounded-[2.5rem] bg-surface shadow-clay-light dark:shadow-clay-dark border border-white/40 dark:border-white/5">
        
        {/* Left Folders */}
        <div className="hidden lg:flex flex-col w-56 border-r border-border-soft p-4 space-y-2 bg-surface-secondary/30">
          <button onClick={() => setActiveFolder('inbox')} className={`flex items-center justify-between w-full p-3 rounded-2xl transition-all ${activeFolder === 'inbox' ? 'bg-surface shadow-clay-light-sm dark:shadow-clay-dark-sm text-brand-blue font-bold' : 'text-text-secondary hover:bg-surface-clay font-medium'}`}>
             <div className="flex items-center"><Inbox className="w-4 h-4 mr-3" /> Inbox</div>
             {emails.filter(e => e.folder === 'inbox' && !e.read).length > 0 && (
               <Badge variant="default" className="w-5 h-5 flex items-center justify-center p-0 text-[10px]">{emails.filter(e => e.folder === 'inbox' && !e.read).length}</Badge>
             )}
          </button>
          <button onClick={() => setActiveFolder('sent')} className={`flex items-center w-full p-3 rounded-2xl transition-all ${activeFolder === 'sent' ? 'bg-surface shadow-clay-light-sm dark:shadow-clay-dark-sm text-brand-blue font-bold' : 'text-text-secondary hover:bg-surface-clay font-medium'}`}>
             <Send className="w-4 h-4 mr-3" /> Sent
          </button>
          <button disabled className="flex items-center w-full p-3 rounded-2xl text-text-muted font-medium">
             <File className="w-4 h-4 mr-3" /> Drafts
          </button>
          <button disabled className="flex items-center w-full p-3 rounded-2xl text-text-muted font-medium">
             <Trash className="w-4 h-4 mr-3" /> Trash
          </button>
        </div>

        {/* Middle List */}
        <div className="flex flex-col w-full md:w-80 lg:w-96 border-r border-border-soft overflow-hidden">
          <div className="p-4 border-b border-border-soft">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input placeholder="Search emails..." className="pl-10 h-10 rounded-xl bg-surface" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
               <div className="p-4 space-y-4">
                 {[...Array(5)].map((_, i) => <div key={i} className="h-20 bg-surface-clay rounded-2xl animate-pulse" />)}
               </div>
            ) : filtered.length === 0 ? (
               <div className="p-8 text-center text-text-muted flex flex-col items-center">
                 <Inbox className="w-12 h-12 mb-4 opacity-20" />
                 <p className="font-semibold">No emails found.</p>
               </div>
            ) : (
               <div className="divide-y divide-border-soft">
                 {filtered.map(email => (
                   <button 
                     key={email.id}
                     onClick={() => setActiveEmail(email)}
                     className={`w-full text-left p-4 transition-colors hover:bg-surface-secondary/50 ${activeEmail?.id === email.id ? 'bg-surface-secondary/80 outline-none ring-1 ring-inset ring-brand-blue/30' : ''}`}
                   >
                     <div className="flex justify-between items-baseline mb-1">
                       <span className={`text-sm truncate pr-2 ${!email.read ? 'font-extrabold text-brand-blue' : 'font-bold text-text-primary'}`}>{email.sender}</span>
                       <span className={`text-xs whitespace-nowrap ${!email.read ? 'font-bold text-brand-blue' : 'text-text-muted'}`}>{format(parseISO(email.date), 'MMM d')}</span>
                     </div>
                     <p className={`text-sm truncate mb-1 ${!email.read ? 'font-bold text-text-primary' : 'font-medium text-text-secondary'}`}>{email.subject}</p>
                     <p className="text-xs text-text-muted truncate">{email.preview}</p>
                   </button>
                 ))}
               </div>
            )}
          </div>
        </div>

        {/* Right Details */}
        <div className="hidden md:flex flex-1 flex-col bg-surface-clay/20 overflow-hidden relative">
          {activeEmail ? (
            <div className="flex flex-col h-full animate-in slide-in-from-right-2 duration-300">
              <div className="p-6 border-b border-border-soft bg-surface/50">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-extrabold text-text-primary mb-4 leading-tight">{activeEmail.subject}</h2>
                  <div className="flex space-x-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl"><CornerUpLeft className="w-4 h-4 text-text-secondary" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl"><MoreVertical className="w-4 h-4 text-text-secondary" /></Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                   <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 rounded-full bg-brand-indigo/10 flex items-center justify-center text-brand-indigo font-bold shrink-0">
                       {activeEmail.sender.charAt(0)}
                     </div>
                     <div className="flex flex-col">
                       <span className="font-bold text-sm">{activeEmail.sender}</span>
                       <span className="text-xs text-text-muted">to me</span>
                     </div>
                   </div>
                   <span className="text-xs font-semibold text-text-muted">{format(parseISO(activeEmail.date), 'MMM d, yyyy h:mm a')}</span>
                </div>
              </div>
              
              <div className="flex-1 p-8 overflow-y-auto">
                 <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
                   <p className="text-base text-text-primary leading-relaxed">{activeEmail.preview} It is fundamentally important that we align on these matters prior to the end of the fiscal quarter. Please ensure that all corresponding documentation reaches our internal vault by next Tuesday.</p>
                   <p className="mt-6 text-base text-text-primary leading-relaxed">Best regards,<br/>{activeEmail.sender}</p>
                 </div>
              </div>

              <div className="p-4 border-t border-border-soft bg-surface m-4 rounded-3xl shadow-clay-light hover:shadow-clay-light-hover dark:shadow-clay-dark transition-all">
                <div className="flex items-center justify-between text-text-muted pl-2">
                  <span className="text-sm font-medium">Click here to reply...</span>
                  <div className="flex space-x-2">
                    <Button variant="clay" size="sm" className="rounded-xl text-brand-violet h-8">
                       <Sparkles className="w-3.5 h-3.5 mr-1.5" /> AI Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-text-muted">
              <Mail className="w-16 h-16 opacity-20 mb-4" />
              <p className="font-semibold text-lg">Select an email to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
