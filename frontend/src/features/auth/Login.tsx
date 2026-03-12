import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, ShieldCheck, Mail, Lock } from 'lucide-react'
import { useAppStore, type Role } from '@/store/useAppStore'

const ROLES: { role: Role; color: string; desc: string }[] = [
  { role: 'Admin', color: 'bg-brand-indigo', desc: 'Full configuration access' },
  { role: 'Manager', color: 'bg-brand-blue', desc: 'Team & module oversight' },
  { role: 'Employee', color: 'bg-accent-emerald', desc: 'Operational tasks' },
  { role: 'Client', color: 'bg-accent-amber', desc: 'Restricted company view' },
]

export function Login() {
  const navigate = useNavigate()
  const setRole = useAppStore(state => state.setRole)
  const [loading, setLoading] = React.useState<Role | null>(null)

  const handleDemoLogin = (role: Role) => {
    setLoading(role)
    setTimeout(() => {
      setRole(role)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left - Branding */}
        <div className="flex flex-col space-y-6 lg:pr-12 text-center lg:text-left items-center lg:items-start order-2 lg:order-1 mt-8 lg:mt-0">
          <div className="w-20 h-20 rounded-[2rem] bg-surface shadow-clay-light dark:shadow-clay-dark flex items-center justify-center border border-white/40 dark:border-white/5 mx-auto lg:mx-0">
            <Sparkles className="w-10 h-10 text-brand-blue" />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-4 drop-shadow-sm">
              FinAI Platform
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-md mx-auto lg:mx-0">
              Enterprise financial management redefined with artificial intelligence. 
              Secure, fast, and exceptionally intuitive.
            </p>
          </div>
          <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm font-medium text-text-muted mt-6 bg-surface-clay py-3 px-6 rounded-3xl shadow-inner-light dark:shadow-inner-dark w-fit mx-auto lg:mx-0">
            <div className="flex items-center"><ShieldCheck className="w-5 h-5 mr-3 text-success-accent" /> Bank-grade Security</div>
            <div className="w-px h-5 bg-border-strong mx-4 hidden sm:block" />
            <div className="flex items-center"><Sparkles className="w-5 h-5 mr-3 text-brand-violet" /> AI-Powered Platform</div>
          </div>
        </div>

        {/* Right - Login Card */}
        <div className="w-full max-w-md mx-auto order-1 lg:order-2">
          <Card className="border-t-4 border-t-brand-blue shadow-clay-light hover:shadow-clay-light-hover dark:shadow-clay-dark dark:hover:shadow-clay-dark-hover transition-all duration-300">
            <CardHeader className="space-y-3 pb-6 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
              <CardDescription className="text-base">Sign in to your enterprise account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div className="space-y-1">
                  <div className="relative group">
                    <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-blue transition-colors" />
                    <Input type="email" placeholder="Email address" className="pl-12 h-12 text-base" defaultValue="admin@demo.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="relative group">
                    <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-blue transition-colors" />
                    <Input type="password" placeholder="Password" className="pl-12 h-12 text-base" defaultValue="password123" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pt-1">
                  <label className="flex items-center text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                    <input type="checkbox" className="mr-3 rounded border-border-strong text-brand-blue focus:ring-brand-blue h-4 w-4 bg-surface" defaultChecked />
                    Remember me
                  </label>
                  <a href="#" className="font-semibold text-brand-blue hover:text-brand-indigo transition-colors hover:underline">Forgot password?</a>
                </div>
                <Button className="w-full h-12 text-base rounded-2xl font-bold mt-2 shadow-clay-light dark:shadow-clay-dark hover:-translate-y-0.5" onClick={() => handleDemoLogin('Admin')}>
                  {loading === 'Admin' ? 'Authenticating...' : 'Sign In'}
                </Button>
              </form>

              <div className="relative pt-2 pb-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-soft" /></div>
                <div className="relative flex justify-center text-xs font-bold tracking-widest uppercase">
                  <span className="bg-surface px-4 text-text-muted">Or Auto-Login As</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {ROLES.map(({ role, color, desc }) => (
                  <button 
                    key={role} 
                    onClick={() => handleDemoLogin(role)}
                    disabled={loading !== null}
                    className="flex flex-col text-left p-4 rounded-3xl bg-surface-clay hover:bg-surface-secondary shadow-inner-light dark:shadow-inner-dark border-2 border-transparent focus:border-brand-blue outline-none transition-all disabled:opacity-50 group active:scale-95"
                  >
                    <div className="flex items-center justify-between mb-2 w-full">
                      <span className="font-bold text-text-primary group-hover:text-brand-blue transition-colors">{role}</span>
                      <div className={`w-3 h-3 rounded-full ${color} shadow-sm`} />
                    </div>
                    <span className="text-xs text-text-muted leading-tight font-medium">{desc}</span>
                    {loading === role && <span className="text-xs font-bold text-brand-blue mt-2 animate-pulse">Logging in...</span>}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
