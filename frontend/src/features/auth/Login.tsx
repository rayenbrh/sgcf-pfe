import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, ShieldCheck, Mail, Lock, Building2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login({ email, password })
      navigate('/dashboard', { replace: true })
    } catch (err: unknown) {
      let message = 'Email ou mot de passe incorrect'
      if (axios.isAxiosError(err) && err.response?.data && typeof err.response.data === 'object') {
        const data = err.response.data as { message?: string }
        if (typeof data.message === 'string') message = data.message
      }
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col space-y-6 lg:pr-12 text-center lg:text-left items-center lg:items-start order-2 lg:order-1 mt-8 lg:mt-0">
          <div className="w-20 h-20 rounded-[2rem] bg-surface shadow-clay-light dark:shadow-clay-dark flex items-center justify-center border border-white/40 dark:border-white/5 mx-auto lg:mx-0">
            <Sparkles className="w-10 h-10 text-brand-blue" />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-4 drop-shadow-sm">
              SGCF
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-md mx-auto lg:mx-0">
              Système intégré de gestion comptable et financière pour votre cabinet.
              Sécurisé, structuré et pensé pour le quotidien des équipes.
            </p>
          </div>
          <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm font-medium text-text-muted mt-6 bg-surface-clay py-3 px-6 rounded-3xl shadow-inner-light dark:shadow-inner-dark w-fit mx-auto lg:mx-0">
            <div className="flex items-center"><ShieldCheck className="w-5 h-5 mr-3 text-success-accent" /> Sécurité renforcée</div>
            <div className="w-px h-5 bg-border-strong mx-4 hidden sm:block" />
            <div className="flex items-center"><Building2 className="w-5 h-5 mr-3 text-brand-violet" /> Gestion de cabinet</div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto order-1 lg:order-2">
          <Card className="border-t-4 border-t-brand-blue shadow-clay-light hover:shadow-clay-light-hover dark:shadow-clay-dark dark:hover:shadow-clay-dark-hover transition-all duration-300">
            <CardHeader className="space-y-3 pb-6 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">Connexion</CardTitle>
              <CardDescription className="text-base">Accédez à votre espace SGCF.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <div className="relative group">
                    <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-blue transition-colors" />
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      className="pl-12 h-12 text-base"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="relative group">
                    <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-blue transition-colors" />
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      className="pl-12 h-12 text-base"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base rounded-2xl font-bold mt-2 shadow-clay-light dark:shadow-clay-dark hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
                {error && (
                  <p className="text-sm text-red-500 text-center mt-2">{error}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
