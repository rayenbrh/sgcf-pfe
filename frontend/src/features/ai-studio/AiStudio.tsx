import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, History, FileText, Loader2, Save, Download } from 'lucide-react'

const TEMPLATES = [
  { id: 't1', label: 'Financial Summary', icon: "📈", desc: 'Generates a Q4 analysis based on invoices.' },
  { id: 't2', label: 'Client Email Draft', icon: "✉️", desc: 'Write a polite reminder for overdue deadlines.' },
  { id: 't3', label: 'Contract Clause', icon: "⚖️", desc: 'Draft a standard lease addition.' },
]

export function AiStudio() {
  const [prompt, setPrompt] = React.useState('')
  const [activeTemplate, setActiveTemplate] = React.useState('t1')
  const [generating, setGenerating] = React.useState(false)
  const [result, setResult] = React.useState<string | null>(null)
  const [progress, setProgress] = React.useState(0)

  const handleGenerate = () => {
    if (!prompt) return
    setGenerating(true)
    setResult(null)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setGenerating(false)
          setResult("## AI Generated Report\n\nBased on your prompt, here is the compiled analysis:\n\n- The Q4 trajectory demonstrates a 12% upside in recurring billing.\n- Top performance primarily driven by 'TechVision Solutions'.\n\n**Recommendation:** Focus on reducing overdue invoices in the retail sector to maintain free cash flow momentum.")
          return 100
        }
        return p + 10
      })
    }, 200)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-border-soft pb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center">
            <Sparkles className="w-8 h-8 text-brand-violet mr-3" />
            AI Studio
          </h1>
          <p className="text-text-secondary mt-1 font-medium">Accelerate accounting tasks with large language models.</p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="flex flex-col items-end">
             <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Quota Remaining</span>
             <span className="text-sm font-extrabold text-success-accent">8,450 Tokens</span>
           </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden mt-6 gap-6 flex-col lg:flex-row">
        
        {/* Left Workbench */}
        <div className="flex flex-col w-full lg:w-5/12 shrink-0 space-y-6 overflow-y-auto pr-2 pb-6">
          <div className="space-y-3">
            <h3 className="font-bold text-sm tracking-widest text-text-muted uppercase">Select Template</h3>
            <div className="grid grid-cols-1 gap-3">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTemplate(t.id)}
                  className={`flex items-start text-left p-4 rounded-3xl transition-all duration-300 border-2 ${activeTemplate === t.id ? 'border-brand-violet bg-brand-violet/5 shadow-inner-light dark:shadow-inner-dark' : 'border-transparent bg-surface hover:bg-surface-secondary shadow-clay-light-sm dark:shadow-clay-dark-sm'}`}
                >
                  <span className="text-2xl mr-4">{t.icon}</span>
                  <div className="flex flex-col space-y-1">
                    <span className="font-bold text-text-primary">{t.label}</span>
                    <span className="text-xs font-medium text-text-muted">{t.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-[300px]">
            <h3 className="font-bold text-sm tracking-widest text-text-muted uppercase mb-3">Your Prompt</h3>
            <div className="relative flex-1 flex flex-col rounded-3xl overflow-hidden bg-surface shadow-clay-light dark:shadow-clay-dark border border-white/40 dark:border-white/5">
              <textarea 
                className="flex-1 w-full bg-transparent p-5 resize-none outline-none text-base placeholder:text-text-muted/60"
                placeholder="Describe exactly what you want to generate. You can mention specific clients, companies, or time periods..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
              <div className="p-4 bg-surface-secondary/50 flexjustify-between items-center border-t border-border-soft flex justify-between">
                <Button variant="ghost" size="icon" className="rounded-xl text-text-muted hover:text-text-primary">
                  <History className="w-5 h-5" />
                </Button>
                <Button 
                   onClick={handleGenerate} 
                   disabled={generating || !prompt}
                   className="rounded-2xl bg-gradient-to-r from-brand-violet to-brand-indigo hover:brightness-110 shadow-clay-light dark:shadow-clay-dark"
                >
                  {generating ? (
                    <><Loader2 className="w-5 h-5 mr-no-animate animate-spin mr-2" /> Processing</>
                  ) : (
                    <><Sparkles className="w-5 h-5 mr-2" /> Generate Output</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Pane */}
        <div className="flex-1 bg-surface-clay rounded-[2.5rem] p-6 shadow-inner-light dark:shadow-inner-dark border border-border-soft flex flex-col relative overflow-hidden">
          {generating ? (
            <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in zoom-in-95 duration-500">
               <div className="relative w-32 h-32 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="45" fill="none" className="stroke-surface-secondary" strokeWidth="8" />
                   <circle cx="50" cy="50" r="45" fill="none" className="stroke-brand-violet transition-all duration-200" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * progress) / 100} strokeLinecap="round" />
                 </svg>
                 <Sparkles className="absolute w-8 h-8 text-brand-violet animate-pulse" />
               </div>
               <p className="text-lg font-bold text-text-primary animate-pulse tracking-wide">Synthesizing data...</p>
            </div>
          ) : result ? (
            <div className="flex flex-col h-full animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-6">
                 <div className="flex space-x-2">
                   <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-surface text-brand-violet shadow-clay-light-sm dark:shadow-clay-dark-sm">Markdown</button>
                   <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-transparent text-text-muted hover:text-text-primary">Preview PDF</button>
                 </div>
                 <div className="flex space-x-2">
                   <Button variant="outline" size="sm" className="rounded-xl border-border-strong text-text-secondary h-8"><Download className="w-4 h-4 mr-2"/> Export</Button>
                   <Button size="sm" className="rounded-xl bg-brand-violet text-white shadow-clay-light-sm dark:shadow-clay-dark-sm h-8"><Save className="w-4 h-4 mr-2"/> Save to Vault</Button>
                 </div>
              </div>
              <div className="flex-1 bg-surface rounded-3xl p-8 shadow-clay-light border border-white/50 dark:border-white/5 overflow-y-auto">
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-text-secondary">
                  {result.split('\n').map((line, i) => {
                    if (line.startsWith('##')) return <h2 key={i} className="text-xl font-extrabold text-text-primary mt-6 mb-4">{line.replace('##', '')}</h2>
                    if (line.startsWith('**')) return <p key={i} className="font-bold text-text-primary mt-4">{line.replace(/\*\*/g, '')}</p>
                    if (line.startsWith('-')) return <li key={i} className="ml-4 list-disc">{line.replace('-', '')}</li>
                    return line ? <p key={i} className="mb-2 leading-relaxed">{line}</p> : null
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-text-muted space-y-4">
              <FileText className="w-16 h-16 opacity-20" />
              <p className="font-semibold text-lg text-center max-w-sm">
                Select a template and write a prompt to generate financial documents, insights, and emails.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
