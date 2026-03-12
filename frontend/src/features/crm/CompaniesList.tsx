import * as React from 'react'
import { mockApi, type MOCK_COMPANIES } from '@/mocks/db'
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Plus, MoreHorizontal } from 'lucide-react'

type Company = typeof MOCK_COMPANIES[0]

export function CompaniesList() {
  const [companies, setCompanies] = React.useState<Company[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    mockApi.getCompanies().then(data => {
      setCompanies(data)
      setLoading(false)
    })
  }, [])

  const filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.siren.includes(search))

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-soft pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Companies</h1>
          <p className="text-text-secondary mt-1 font-medium">Manage legal entities and properties.</p>
        </div>
        <Button className="rounded-xl shadow-clay-light dark:shadow-clay-dark" size="lg">
          <Plus className="w-5 h-5 mr-2" /> Add Company
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Search by name or SIREN..." 
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
                <TableHead>Company Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>SIREN / VAT</TableHead>
                <TableHead>Revenue / Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-text-muted">
                    No companies found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(company => (
                  <TableRow key={company.id} className="cursor-pointer group">
                    <TableCell className="font-bold text-base">{company.name}</TableCell>
                    <TableCell>
                      <Badge variant="clay" className="uppercase font-bold tracking-widest text-[10px]">{company.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs">{company.siren}</span>
                        <span className="text-xs text-text-muted font-mono">{company.vatNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-success-text">€{(company.revenue / 1000).toFixed(0)}k</span>
                        <span className="text-xs text-text-muted">{company.employees} emp.</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={company.status === 'active' ? 'success' : 'secondary'}>
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
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
