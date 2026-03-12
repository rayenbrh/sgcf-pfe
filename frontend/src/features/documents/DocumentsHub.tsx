import * as React from 'react'
import { mockApi, type MOCK_DOCUMENTS } from '@/mocks/db'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Folder, FileText, UploadCloud, Search, Download, 
  MoreVertical, FileArchive, File
} from 'lucide-react'
import { format, parseISO } from 'date-fns'

type Doc = typeof MOCK_DOCUMENTS[0]

export function DocumentsHub() {
  const [documents, setDocuments] = React.useState<Doc[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const [sidebarFolders] = React.useState(['Legal', 'Accounting', 'Billing', 'Contracts', 'HR'])
  const [activeFolder, setActiveFolder] = React.useState('All')

  React.useEffect(() => {
    mockApi.getDocuments().then(data => {
      setDocuments(data)
      setLoading(false)
    })
  }, [])

  const filtered = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase())
    const matchesFolder = activeFolder === 'All' || doc.folder === activeFolder
    return matchesSearch && matchesFolder
  })

  // Simulated upload state
  const [isUploading, setIsUploading] = React.useState(false)
  const handleSimulateUpload = () => {
    setIsUploading(true)
    setTimeout(() => setIsUploading(false), 2000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-soft pb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Documents</h1>
          <p className="text-text-secondary mt-1 font-medium">Securely store and share files with clients.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            className="rounded-xl shadow-clay-light dark:shadow-clay-dark relative overflow-hidden group"
            onClick={handleSimulateUpload}
            disabled={isUploading}
          >
            <UploadCloud className="w-5 h-5 mr-2" /> 
            {isUploading ? 'Uploading...' : 'Upload File'}
            {isUploading && (
              <div className="absolute bottom-0 left-0 h-1 bg-white/40 animate-[pulse_1s_ease-in-out_infinite] w-full" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden mt-6 gap-6">
        {/* Left Sidebar Tree */}
        <div className="hidden lg:flex flex-col w-64 shrink-0 pr-4 border-r border-border-soft overflow-y-auto">
          <div className="mb-4">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider pl-3">Locations</span>
          </div>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveFolder('All')}
              className={`w-full flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeFolder === 'All' ? 'bg-surface-secondary text-brand-blue shadow-inner-light dark:shadow-inner-dark' : 'text-text-secondary hover:bg-surface-clay hover:text-text-primary'}`}
            >
              <Folder className="w-4 h-4 mr-3 text-brand-blue" />
              All Documents
            </button>
            {sidebarFolders.map(folder => (
              <button 
                key={folder}
                onClick={() => setActiveFolder(folder)}
                className={`w-full flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeFolder === folder ? 'bg-surface-secondary text-brand-indigo shadow-inner-light dark:shadow-inner-dark' : 'text-text-secondary hover:bg-surface-clay hover:text-text-primary'}`}
              >
                <Folder className="w-4 h-4 mr-3 text-brand-indigo/70" />
                {folder}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="relative w-full mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Search files in the current folder..." 
              className="pl-11 h-12 text-base rounded-2xl shadow-inner-light dark:shadow-inner-dark bg-surface-clay border-transparent focus-visible:ring-1"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 pb-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-44 rounded-3xl bg-surface-clay animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full text-center p-8 text-text-muted">
                <Folder className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-xl font-bold">This folder is empty</p>
                <p className="text-sm">Upload files or sync folders to see them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(doc => {
                  const isPdf = doc.type === 'pdf'
                  const isZip = doc.type === 'zip'
                  const isWord = doc.type === 'word'
                  
                  return (
                    <Card key={doc.id} className="group hover:shadow-clay-light-hover dark:hover:shadow-clay-dark-hover transition-all duration-300">
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner-light dark:shadow-inner-dark ${isPdf ? 'bg-danger-bg text-danger-text' : isZip ? 'bg-warning-bg text-warning-text' : 'bg-info-bg text-info-text'}`}>
                            {isPdf && <FileText className="w-6 h-6" />}
                            {isZip && <FileArchive className="w-6 h-6" />}
                            {isWord && <File className="w-6 h-6" />}
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary rounded-xl">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-base truncate mb-1" title={doc.name}>{doc.name}</h3>
                          <p className="text-text-muted text-xs truncate mb-3">Company: {doc.companyId}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs font-semibold mt-auto pt-4 border-t border-border-soft">
                          <span className="text-text-secondary">{format(parseISO(doc.uploadDate), 'MMM dd, yyyy')}</span>
                          <span className="text-text-muted">{doc.size}</span>
                        </div>
                        
                        {/* Hover Overlay Action */}
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 bg-surface/90 backdrop-blur-sm border-t border-white/20">
                          <Button variant="default" className="w-full rounded-xl h-9" size="sm">
                            <Download className="w-4 h-4 mr-2" /> Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
