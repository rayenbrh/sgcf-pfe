import * as React from 'react'

import { mockApi } from '@/mocks/db'
import { 
  Building, CreditCard, TrendingUp, AlertCircle, FileText, Activity 
} from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const revenueData = [
  { name: 'Jan', value: 120000 },
  { name: 'Feb', value: 145000 },
  { name: 'Mar', value: 110000 },
  { name: 'Apr', value: 180000 },
  { name: 'May', value: 210000 },
  { name: 'Jun', value: 250000 },
  { name: 'Jul', value: 205000 },
]

export function Dashboard() {
  const [stats, setStats] = React.useState<any>(null)

  React.useEffect(() => {
    mockApi.getDashboardStats().then(setStats)
  }, [])

  if (!stats) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-10 w-64 bg-surface-clay rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[...Array(4)].map((_, i) => <div key={i} className="h-40 bg-surface-clay rounded-3xl animate-pulse shadow-clay-light dark:shadow-clay-dark" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Tableau de bord</h1>
          <p className="text-text-secondary mt-1 font-medium">Vue d’ensemble SGCF — activité et indicateurs du cabinet.</p>
        </div>
        <div className="flex gap-2">
           <div className="text-sm px-4 py-2 bg-brand-indigo/10 text-brand-indigo font-bold rounded-2xl border border-brand-indigo/20 shadow-sm">
             Q3 2026
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue YTD" 
          value="€3.45M" 
          icon={TrendingUp} 
          trend="12.5%" 
          trendUp 
          iconColor="text-brand-blue"
        />
        <StatCard 
          title="Active Clients" 
          value={stats.activeClients} 
          icon={Building} 
          trend="4 this month" 
          trendUp 
          iconColor="text-brand-indigo"
        />
        <StatCard 
          title="Pending Deadlines" 
          value={stats.pendingDeadlines} 
          icon={AlertCircle} 
          iconColor="text-danger-accent"
        />
        <StatCard 
          title="Avg Collection Days" 
          value={`${stats.avgCollectionDays}d`} 
          icon={CreditCard} 
          trend="3 days shorter" 
          trendUp 
          iconColor="text-success-accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Forecast</CardTitle>
          </CardHeader>
          <CardContent className="h-80 w-full pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-soft)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-text-muted text-xs font-semibold" dy={10} />
                <YAxis axisLine={false} tickLine={false} className="text-text-muted text-xs font-semibold" dx={-10} tickFormatter={val => `€${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface)', borderRadius: '1.5rem', border: '1px solid var(--border-soft)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-success-bg flex items-center justify-center shrink-0 shadow-inner-light dark:shadow-inner-dark">
                   <Activity className="w-6 h-6 text-success-text" />
                 </div>
                 <div className="flex flex-col justify-center">
                   <p className="text-sm font-bold text-text-primary">TVA Mensuelle TechVision</p>
                   <p className="text-xs font-medium text-text-muted mt-0.5">System automated • 2 hours ago</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-brand-indigo/10 flex items-center justify-center shrink-0 shadow-inner-light dark:shadow-inner-dark">
                   <FileText className="w-6 h-6 text-brand-indigo" />
                 </div>
                 <div className="flex flex-col justify-center">
                   <p className="text-sm font-bold text-text-primary">Bilan Annuel Uploaded</p>
                   <p className="text-xs font-medium text-text-muted mt-0.5">Marie Durand • 4 hours ago</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-danger-bg flex items-center justify-center shrink-0 shadow-inner-light dark:shadow-inner-dark">
                   <AlertCircle className="w-6 h-6 text-danger-text" />
                 </div>
                 <div className="flex flex-col justify-center">
                   <p className="text-sm font-bold text-text-primary">Failed Login Attempt</p>
                   <p className="text-xs font-medium text-text-muted mt-0.5">Unknown IP • 1 day ago</p>
                 </div>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
