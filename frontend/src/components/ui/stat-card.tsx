import * as React from 'react'
import { Card, CardContent } from './card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  trend?: string
  trendUp?: boolean
  className?: string
  iconColor?: string
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, className, iconColor }: StatCardProps) {
  return (
    <Card className={cn("p-0 overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text-secondary tracking-wide uppercase">{title}</p>
          <div className={cn("p-2.5 rounded-2xl bg-surface-clay shadow-inner-light dark:shadow-inner-dark", iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline space-x-3">
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">{value}</h2>
          {trend && (
            <span className={cn("text-xs font-bold px-2 py-1 rounded-lg bg-surface-clay", trendUp ? "text-success-accent" : "text-danger-accent")}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
