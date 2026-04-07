import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings as SettingsIcon, Shield, User, Bell, Palette } from 'lucide-react'

export function Settings() {
  const [activeTab, setActiveTab] = React.useState('profile')

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-in fade-in duration-500 pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-soft pb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center">
            <SettingsIcon className="w-8 h-8 text-brand-blue mr-3" />
            Paramètres SGCF
          </h1>
          <p className="text-text-secondary mt-1 font-medium">Compte et préférences de l’application.</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden mt-6 gap-8 flex-col lg:flex-row">
        
        {/* Settings Navigation */}
        <div className="flex flex-col w-full lg:w-64 shrink-0 space-y-2">
          <button onClick={() => setActiveTab('profile')} className={`flex items-center w-full p-3 rounded-2xl transition-all font-bold ${activeTab === 'profile' ? 'bg-surface shadow-clay-light-sm dark:shadow-clay-dark-sm text-brand-blue' : 'text-text-secondary hover:bg-surface-clay'}`}>
             <User className="w-5 h-5 mr-3" /> Profile
          </button>
          <button onClick={() => setActiveTab('security')} className={`flex items-center w-full p-3 rounded-2xl transition-all font-bold ${activeTab === 'security' ? 'bg-surface shadow-clay-light-sm dark:shadow-clay-dark-sm text-brand-blue' : 'text-text-secondary hover:bg-surface-clay'}`}>
             <Shield className="w-5 h-5 mr-3" /> Security
          </button>
          <button onClick={() => setActiveTab('notifications')} className={`flex items-center w-full p-3 rounded-2xl transition-all font-bold ${activeTab === 'notifications' ? 'bg-surface shadow-clay-light-sm dark:shadow-clay-dark-sm text-brand-blue' : 'text-text-secondary hover:bg-surface-clay'}`}>
             <Bell className="w-5 h-5 mr-3" /> Notifications
          </button>
          <button onClick={() => setActiveTab('appearance')} className={`flex items-center w-full p-3 rounded-2xl transition-all font-bold ${activeTab === 'appearance' ? 'bg-surface shadow-clay-light-sm dark:shadow-clay-dark-sm text-brand-blue' : 'text-text-secondary hover:bg-surface-clay'}`}>
             <Palette className="w-5 h-5 mr-3" /> Appearance
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto pr-2 pb-8">
           <Card className="max-w-3xl border-t-4 border-t-brand-blue">
             <CardHeader className="space-y-1">
               <CardTitle className="text-2xl">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</CardTitle>
               <CardDescription>Update your {activeTab} information below.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-6">
               {activeTab === 'profile' && (
                 <>
                   <div className="flex items-center space-x-6">
                     <div className="w-24 h-24 rounded-[2rem] bg-brand-indigo/10 flex items-center justify-center text-3xl font-extrabold text-brand-indigo shadow-inner-light dark:shadow-inner-dark border-4 border-surface">
                       AD
                     </div>
                     <Button variant="outline" className="rounded-xl shadow-clay-light-sm dark:shadow-clay-dark-sm font-bold">Change Avatar</Button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-text-secondary">First Name</label>
                       <Input defaultValue="Admin" className="bg-surface-secondary shadow-inner-light dark:shadow-inner-dark font-medium" />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-text-secondary">Last Name</label>
                       <Input defaultValue="User" className="bg-surface-secondary shadow-inner-light dark:shadow-inner-dark font-medium" />
                     </div>
                     <div className="space-y-2 md:col-span-2">
                       <label className="text-sm font-bold text-text-secondary">Email Address</label>
                       <Input defaultValue="admin@demo.com" className="bg-surface-secondary shadow-inner-light dark:shadow-inner-dark font-medium" />
                     </div>
                   </div>
                 </>
               )}
               
               {activeTab !== 'profile' && (
                 <div className="h-48 flex items-center justify-center text-text-muted text-center flex-col">
                   <SettingsIcon className="w-12 h-12 mb-4 opacity-20" />
                   <p className="font-semibold text-lg text-text-secondary">Settings isolated for demo purposes.</p>
                 </div>
               )}

               <div className="flex justify-end pt-6 border-t border-border-soft mt-6">
                 <Button className="rounded-2xl px-8 shadow-clay-light dark:shadow-clay-dark h-12 text-base font-bold" disabled={activeTab !== 'profile'}>
                   Save Changes
                 </Button>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
